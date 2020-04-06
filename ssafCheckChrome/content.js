const members = [
  { name: '김강현' },
  { name: '김고은' },
  { name: '김동률' },
  { name: '김동현' },
  { name: '김민건' },
  { name: '김수민' },
  { name: '김승기' },
  { name: '김태연' },
  { name: '박재우' },
  { name: '배유진' },
  { name: '배재원' },
  { name: '서민성' },
  { name: '유동균' },
  { name: '유지민' },
  { name: '윤경준' },
  { name: '윤수연' },
  { name: '이정훈' },
  { name: '전혜인' },
  { name: '정다희' },
  { name: '정동건' },
  { name: '정명주' },
  { name: '정지찬' },
  { name: '최문경' },
  { name: '최연희' },
  { name: '최예인' },
];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === 'quiz') {
    const posts = document.querySelectorAll('.post__content');
    const data = Array.from(posts).map(p => {
      const name = p.querySelector('button.user-popover').innerText;
      const time = p.querySelector('.post__time').innerText;
      const msg = p.querySelector('.post-message__text').innerText;

      return {
        name,
        time,
        msg,
      };
    });

    const membersDone = [];

    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].msg.indexOf(request.divider) > -1 || (data[i].time.slice(0, 2) === "오후" && data[i].time.slice(3, 4) >= 6)) {
        break;
      } else {
        membersDone.push(data[i].name.slice(0, 3));
      }
    }
    const membersNotDone = members.filter((member) => membersDone.indexOf(member.name) === -1);

    const response = {};
    response.cnt = membersNotDone.length;
    response.data = membersNotDone;

    sendResponse(response);
  }
})