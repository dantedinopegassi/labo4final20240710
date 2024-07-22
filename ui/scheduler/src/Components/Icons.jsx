// Ejemplo de componente de iconos
// const iconos_y_links = [
//   {
//     icon: "fab fa-github icon",
//     link: "https://github.com/gerogabas/ProyectoKiosko",
//     background: "before:bg-gray-800",
//   },
//   {
//     icon: "fab fa-linkedin icon",
//     link: "https://www.linkedin.com/in/",
//     background: "before:bg-blue-700",
//   },
//   {
//     icon: "fab fa-twitter icon",
//     link: "https://twitter.com/",
//     background: "before:bg-blue-500",
//   },
// ];

export default function Icons({ iconsYlinks }) {
  return (
    <ul className="ulicon">
      {iconsYlinks.map((dato, i) => (
        <li key={i} className={` liicon`}>
          <a className={`${dato.background} aicon`} href={dato.link}>
            <i className={`${dato.icon} icon`}></i>
          </a>
        </li>
      ))}
    </ul>
  );
}
/* .liicon:nth-child(1) .aicon:before{
  background: #0d1117;
} */
