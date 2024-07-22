import { useEffect, useRouteError } from "react";
import { Link } from "react-router-dom";
import "./assets/astro.css";
export default function ErrorPage() {
    //credits to @eroxburgh from codepen
  useEffect(() => {
    function drawVisor() {
      const canvas = document.getElementById("visor");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

      ctx.lineTo(15, 10);

      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);

      ctx.fillStyle = "#2f3640";
      ctx.strokeStyle = "#f5f6fa";
      ctx.fill();
      ctx.stroke();
    }

    function animate() {
      const cordCanvas = document.getElementById("cord");
      const ctx = cordCanvas.getContext("2d");

      let y1 = 160;
      let y2 = 100;
      let y3 = 100;

      let y1Forward = true;
      let y2Forward = false;
      let y3Forward = true;

      function animateFrame() {
        requestAnimationFrame(animateFrame);
        ctx.clearRect(/*0, 0, innerWidth, innerHeight */);

        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 8;
        ctx.stroke();

        if (y1 === 100) {
          y1Forward = true;
        }

        if (y1 === 300) {
          y1Forward = false;
        }

        if (y2 === 100) {
          y2Forward = true;
        }

        if (y2 === 310) {
          y2Forward = false;
        }

        if (y3 === 100) {
          y3Forward = true;
        }

        if (y3 === 317) {
          y3Forward = false;
        }

        y1Forward ? (y1 += 1) : (y1 -= 1);
        y2Forward ? (y2 += 1) : (y2 -= 1);
        y3Forward ? (y3 += 1) : (y3 -= 1);
      }

      drawVisor();
      animateFrame();
    }

    animate();
  }, []);

  function putear() {
    const pt = [
      "Forro",
      "Corneta",
      "Wampa",
      "Tobogan de piojos",
      "Gordo cementerio de canelones",
      "Hijo de camion de porongas",
      "Terrorista de choripanes",
      "Arruinador de alegrías",
      "Catador de porongas",
      "Cocinero de porongas",
      "Tronador de porongas",
      "Tragasables",
      "Decantador de wascas",
    ];
    for (let i = 0; i < 5; i++) {
    alert(pt[Math.floor(Math.random() * pt.length)]);
    }
  }
  // ahora no me anda esto
  // const error = useRouteError();
  return (
    <div class="bodyastro">
      <div class="moon"></div>
      <div class="moon__crater moon__crater1"></div>
      <div class="moon__crater moon__crater2"></div>
      <div class="moon__crater moon__crater3"></div>

      <div class="star star1"></div>
      <div class="star star2"></div>
      <div class="star star3"></div>
      <div class="star star4"></div>
      <div class="star star5"></div>

      <div class="error">
        <div class="error__title">404</div>
        <div class="error__subtitle">Hmmm...</div>
        <div class="error__description">
          Parece que "alguien" se olvido de "algo"...
        </div>
        {/* <p><i>{JSON.stringify(error)}</i></p> */}
        <br />
        <Link to="/" class="error__button error__button--active">HOME</Link>
        <Link to="#" onClick={() => putear()} class="error__button">PUTEAR</Link>
      </div>

      <div class="astronaut">
        <div class="astronaut__backpack"></div>
        <div class="astronaut__body"></div>
        <div class="astronaut__body__chest"></div>
        <div class="astronaut__arm-left1"></div>
        <div class="astronaut__arm-left2"></div>
        <div class="astronaut__arm-right1"></div>
        <div class="astronaut__arm-right2"></div>
        <div class="astronaut__arm-thumb-left"></div>
        <div class="astronaut__arm-thumb-right"></div>
        <div class="astronaut__leg-left"></div>
        <div class="astronaut__leg-right"></div>
        <div class="astronaut__foot-left"></div>
        <div class="astronaut__foot-right"></div>
        <div class="astronaut__wrist-left"></div>
        <div class="astronaut__wrist-right"></div>

        <div class="astronaut__cord">
          <canvas id="cord" height="500px" width="500px"></canvas>
        </div>

        <div class="astronaut__head">
          <canvas id="visor" width="60px" height="60px"></canvas>
          <div class="astronaut__head-visor-flare1"></div>
          <div class="astronaut__head-visor-flare2"></div>
        </div>
      </div>
      <script src="astro.js"></script>
    </div>
  );
}

