// leadcloud start

function getUid() {
  return window.screen.availWidth.toString() + '-' +
    window.screen.availHeight.toString() + '-' +
    window.screen.colorDepth.toString(36) + '-' +
    Date.now().toString(36) + '-' +
    Math.random().toString(36).substring(3, 7) +
    Math.random().toString(36).substring(3, 7);
}

function generateUid() {
  var uid = localStorage.getItem('uid');
  if (!uid) {
    uid = getUid();
    localStorage.setItem('uid', uid);
  }
  return uid;
}

var uid = generateUid();

lc();

const query_user = new AV.Query('user_record');
const query_page = new AV.Query('page_record');

function createNewUser() {
  try {
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
    user.save();
  } catch (e) {
    console.error(e);
  }
  // user.save().then((user) => {
  //     // console.log('mark as new user');
  // });
}

function createNewPage() {
  const page_record = AV.Object.extend('page_record');
  const page = new page_record();
  page.set('count', 1);
  page.set('first_visited', new Date());
  page.set('last_visited', new Date());
  page.set('title', document.title);
  page.set('star_num', 0);
  page.set('from', document.referrer);
  page.save();
}

function getUV() {
  const query = new AV.Query('user_record');
  query.count().then((count) => {
    document.getElementById('uv_count').innerText = 'uv:' + count;
  });
};
window.getUV = getUV;
getUV();

function getPV() {
  const query = new AV.Query('page_record');
  query.equalTo('title', document.title);
  query.first().then((page) => {
    if (page && page.attributes) {
      document.getElementById('pv_count').innerText = 'pv:' + page.attributes.count;
    }
  });
};
window.getPV = getPV;
getPV();

function throttle(fn, time) {
  let isRuning = false;
  return function () {
    if (isRuning) {
      return;
    }
    isRuning = true;
    fn.apply(this, arguments);
    setTimeout(() => {
      isRuning = false;
    }, time);
  };
}

/**
* star
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
    console.log('err', err);
    createNewPage();
  }
}

async function initUV() {
  // ua
  try {
    query_user.equalTo('uid', uid);
    const user = await query_user.first();
    if (!user) {
      createNewUser();
      return;
    } else if (Date.now() - Date.parse(user.attributes.last_visited) > 12000) {
      const user_update = AV.Object.createWithoutData('user_record', user.id);
      user_update.set('cip', returnCitySN.cip);
      user_update.set('cid', returnCitySN.cid);
      user_update.set('cname', returnCitySN.cname);
      user_update.set('last_visited', new Date());
      user_update.set('last_visited_title', document.title);
      if (document.referrer && !document.referrer.includes(location.host)) {
        user_update.set('from', document.referrer);
      }
      user_update.save();
    }
  } catch (err) {
    console.log('err', err);
    createNewUser();
  }
}

async function initPV() {
  // pv
  try {
    query_page.equalTo('title', document.title);
    const page = await query_page.first();
    if (!page) {
      createNewPage();
      return;
    } else {
      const page_update = AV.Object.createWithoutData('page_record', page.id);
      page_update.increment('count', 1);
      page_update.save();
      if (document.getElementById('star_num') && page.attributes.star_num) {
        document.getElementById('star_num').innerText = page.attributes.star_num;
      }
    }
  } catch (err) {
    console.log('err', err);
    createNewPage();
  }
}

// star
if (document.getElementById('star_btn')) {
  document.getElementById('star_btn').onclick = throttle(incStar, 500);
  var title_star = 'isStar-' + document.title;
  var isStar = localStorage.getItem(title_star) === 'true';
  if (isStar) {
    document.getElementById('star_btn').className = 'is_star';
  }
}

initUV();
initPV();
// leadcloud end