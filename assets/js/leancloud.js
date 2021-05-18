// leadcloud start
AV.init({
    appId: leancloud.appId,
    appKey: leancloud.appKey,
});

const query_user = new AV.Query('user_record');
const query_page = new AV.Query('page_record');

/**
 * 创建一个新用户,并且生成新表对象
 */
function createNewUser() {
    const user_record = AV.Object.extend('user_record');
    const user = new user_record();
    user.set('uid', window.uid);
    user.set('cip', returnCitySN.cip);
    user.set('cid', returnCitySN.cid);
    user.set('cname', returnCitySN.cname);
    user.set('first_visited', new Date());
    user.set('last_visited', new Date());
    user.set('first_visited_title', document.title);
    user.set('last_visited_title', document.title);
    user.save().then((user) => {
        // console.log('mark as new user');
    });
}

/**
 * 创建一个新的page pv记录
 */
function createNewPage() {
    const page_record = AV.Object.extend('page_record');
    const page = new page_record();
    page.set('count', 1);
    page.set('first_visited', new Date());
    page.set('last_visited', new Date());
    page.set('title', document.title);
    page.set('star_num', 0);
    page.save().then((page) => {
        // console.log('mark as new user');
    });
}

/**
 * 获取uv并显示
 */
function getUniqueUser() {
    const query = new AV.Query('user_record');
    query.count().then((count) => {
        document.getElementById('uv_count').innerText = `uv:${count}`;
    })
};

/**
 * 获取pv并显示
 */
function getPV() {
    const query = new AV.Query('page_record');
    query.equalTo('title', document.title);
    query.first().then((page) => {
        document.getElementById('pv_count').innerText = `pv:${page.attributes.count}`;
    })
};

/**
 * 点赞功能
 */
async function incStar() {
    var title_star = 'isStar-' + document.title;
    var isStar = localStorage.getItem(title_star) === 'true' ? false : true;
    if (isStar) {
        localStorage.setItem(title_star, isStar);
        document.getElementById('star_btn').className = 'is_star';
    } else {
        document.getElementById('star_btn').className = '';
        localStorage.removeItem(title_star);
    }

    query_page.equalTo('title', document.title);
    try {
        const page = await query_page.first();
        if (page) {
            const page_update = AV.Object.createWithoutData('page_record', page.id);
            page_update.increment('star_num', (isStar ? 1 : -1));
            page_update.save();
            if (document.getElementById('star_num') && page.attributes.star_num) {
                document.getElementById('star_num').innerText = page.attributes.star_num + (isStar ? 1 : -1);
            }
        }
    } catch (err) {
        // 未定义对象
        console.log('err', err)
        createNewPage();
    }
}

/**
 * leancloud主函数
 * 判断当前用户是否新用户，获取uv和更新
 */
async function main() {
    // ua
    try {
        query_user.equalTo('uid', uid);
        const user = await query_user.first();
        if (!user) {
            // 未找到与当前uid匹配的用户
            createNewUser();
        } else if (Date.now() - Date.parse(user.attributes.last_visited) > 60000) {
            const user_update = AV.Object.createWithoutData('user_record', user.id);
            user_update.set('cip', returnCitySN.cip);
            user_update.set('cid', returnCitySN.cid);
            user_update.set('cname', returnCitySN.cname);
            user_update.set('last_visited', new Date());
            user.set('last_visited_title', document.title);
            user_update.save();
        }
        getUniqueUser();
    } catch (err) {
        // 未定义对象
        console.log('err', err)
        createNewUser();
    }

    // pv
    try {
        query_page.equalTo('title', document.title);
        const page = await query_page.first();
        if (!page) {
            // 未找到与当前title匹配的页面记录
            createNewPage();
        } else {
            const page_update = AV.Object.createWithoutData('page_record', page.id);
            page_update.increment('count', 1);
            page_update.save();
            if (document.getElementById('star_num') && page.attributes.star_num) {
                document.getElementById('star_num').innerText = page.attributes.star_num;
            }
        }
        getPV();
    } catch (err) {
        // 未定义对象
        console.log('err', err)
        createNewPage();
    }

    // star
    if (document.getElementById('star_btn')) {
        document.getElementById('star_btn').onclick = incStar;
        var title_star = 'isStar-' + document.title;
        var isStar = localStorage.getItem(title_star) === 'true';
        if (isStar) {
            document.getElementById('star_btn').className = 'is_star';
        }
    }
}

main();
// leadcloud end
