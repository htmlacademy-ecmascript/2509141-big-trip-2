const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}
// ❔ Б14. Код всех JS-файлов соответствует рекомендованной структуре.
// export { rightColors };
// При этом следующая строка не имеет пробелов между {}. Их наличие или отсутствие не имеет значения для оформления и единообразия?
export {RenderPosition, createElement, render};
