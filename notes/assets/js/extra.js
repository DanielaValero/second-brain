const sidebar = document.querySelector('.md-sidebar--primary');
sidebar.classList.add('js-resizable');

const resizableElem = document.querySelector('.js-resizable');
resizableElem.classList.toggle('resizable')


const resizer = document.createElement('div');
resizer.className = 'resizer-elem';
resizableElem.appendChild(resizer);
resizer.addEventListener('mousedown', initDrag, false);


let startX, startY, startWidth, startHeight;

function initDrag(e) {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(resizableElem).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(resizableElem).height, 10);
  document.documentElement.addEventListener('mousemove', doDrag, false);
  document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
  resizableElem.style.width = (startWidth + e.clientX - startX) + 'px';
  resizableElem.style.height = (startHeight + e.clientY - startY) + 'px';
  console.log(startWidth, e, startX, resizableElem.style.width);
}

function stopDrag(e) {
  document.documentElement.removeEventListener('mousemove', doDrag, false);
  document.documentElement.removeEventListener('mouseup', stopDrag, false);
}