import s from "./HomeParts.module.css";
import React from "react";

export default function Partenaires() {
  return (
    <section className={`${s.parallaxGroup} ${s.partenairesGroup}`}>
      <figure className={`${s.parallaxLayer} ${s.figure}`}>
        <img src={`/jivahill-paddock.jpg`} />
      </figure>
      <article className={`${s.parallaxLayer} ${s.article}`}>
        <h1>Mes partenaires</h1>

        <h2>Cheval Chic</h2>
        <p className={s.left}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. At
          consectetur lorem donec massa sapien faucibus et molestie. Venenatis
          urna cursus eget nunc scelerisque viverra. Nullam vehicula ipsum a
          arcu. Senectus et netus et malesuada fames ac turpis egestas maecenas.
          Scelerisque purus semper eget duis at tellus at urna.
        </p>
        <h2>Selle Expert</h2>
        <p className={s.right}>
          Amet nisl purus in mollis nunc sed id. Amet luctus venenatis lectus
          magna fringilla urna porttitor rhoncus. Molestie nunc non blandit
          massa enim nec. Arcu non odio euismod lacinia. Sagittis purus sit amet
          volutpat consequat. In eu mi bibendum neque egestas. Purus ut faucibus
          pulvinar elementum integer enim. Neque volutpat ac tincidunt vitae
          semper quis lectus nulla at. Volutpat consequat mauris nunc congue
          nisi vitae suscipit. Donec enim diam vulputate ut.
        </p>
        <h2>Assurance je ne sais quoi</h2>
        <p className={s.left}>
          Velit ut tortor pretium viverra suspendisse potenti. Pellentesque sit
          amet porttitor eget. Lobortis elementum nibh tellus molestie nunc non
          blandit. Maecenas volutpat blandit aliquam etiam erat velit
          scelerisque. Ut eu sem integer vitae justo eget magna fermentum
          iaculis. Aenean pharetra magna ac placerat vestibulum lectus mauris
          ultrices eros. Varius morbi enim nunc faucibus.
        </p>
      </article>
    </section>
  );
}
