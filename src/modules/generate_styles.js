export const stylesTagId = 'stagimap-styles';

export const generateStyles = () => {
  const ver = document.getElementById('stagimap').children[0].getAttribute('class').slice(0, -4);
  const styles = document.createElement('style');
  styles.id = stylesTagId;

  styles.innerHTML = `
    .ym-api-button {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
      border-box;
      cursor: pointer;
      overflow: hidden;
    }
    .${ver}-default-cluster {
      font-weight: bold;
      color: ffffff;
      font-size: 16px;
    }
  `;

  document.body.appendChild(styles);
}