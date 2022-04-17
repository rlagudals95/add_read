export const resizeScreen =(event: MouseEvent, container) => {
  
    const scrollX = document.documentElement.scrollWidth;
    const scrollY = document.documentElement.scrollHeight;

    container.style.width = `${scrollX}px`
    container.style.height = `${scrollY}px`
}