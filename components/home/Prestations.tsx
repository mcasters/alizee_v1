import s from "./HomeParts.module.css";
import React from "react";

export default function Prestations() {
  return (
    <section className={`${s.parallaxGroup} ${s.prestationsGroup}`}>
      <figure className={`${s.parallaxLayer} ${s.figure}`}>
        <img src={`/figo-barbaste.jpeg`} />
      </figure>
      <article className={`${s.parallaxLayer} ${s.article}`}>
        <h1>Mes prestations</h1>
        <h2>Valorisation</h2>
        <p className={s.left}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. At
          consectetur lorem donec massa sapien faucibus et molestie. Venenatis
          urna cursus eget nunc scelerisque viverra. Nullam vehicula ipsum a
          arcu. Senectus et netus et malesuada fames ac turpis egestas maecenas.
          Scelerisque purus semper eget duis at tellus at urna. Est pellentesque
          elit ullamcorper dignissim cras tincidunt lobortis feugiat. Ultrices
          vitae auctor eu augue ut. Metus vulputate eu scelerisque felis
          imperdiet proin fermentum leo vel. Parturient montes nascetur
          ridiculus mus mauris vitae ultricies leo. Id ornare arcu odio ut sem.
          Pellentesque habitant morbi tristique senectus et.
        </p>
        <h2>Commerce</h2>
        <p className={s.right}>
          Amet nisl purus in mollis nunc sed id. Amet luctus venenatis lectus
          magna fringilla urna porttitor rhoncus. Molestie nunc non blandit
          massa enim nec. Arcu non odio euismod lacinia. Sagittis purus sit amet
          volutpat consequat. In eu mi bibendum neque egestas. Purus ut faucibus
          pulvinar elementum integer enim. Neque volutpat ac tincidunt vitae
          semper quis lectus nulla at. Volutpat consequat mauris nunc congue
          nisi vitae suscipit. Donec enim diam vulputate ut. Eget nullam non
          nisi est sit amet facilisis magna. Libero nunc consequat interdum
          varius sit. Arcu dui vivamus arcu felis bibendum ut tristique et
          egestas. Pharetra et ultrices neque ornare. Congue eu consequat ac
          felis donec et odio pellentesque. Et tortor consequat id porta nibh
          venenatis cras sed. Phasellus vestibulum lorem sed risus ultricies
          tristique nulla.
        </p>
        <h2>Compétition</h2>
        <p className={s.left}>
          Velit ut tortor pretium viverra suspendisse potenti. Pellentesque sit
          amet porttitor eget. Lobortis elementum nibh tellus molestie nunc non
          blandit. Maecenas volutpat blandit aliquam etiam erat velit
          scelerisque. Ut eu sem integer vitae justo eget magna fermentum
          iaculis. Aenean pharetra magna ac placerat vestibulum lectus mauris
          ultrices eros. Varius morbi enim nunc faucibus. Nulla facilisi etiam
          dignissim diam quis enim. Condimentum id venenatis a condimentum vitae
          sapien. Justo nec ultrices dui sapien eget mi. In cursus turpis massa
          tincidunt dui. Vel orci porta non pulvinar. Pretium vulputate sapien
          nec sagittis aliquam malesuada bibendum. At lectus urna duis convallis
          convallis tellus id. Viverra vitae congue eu consequat ac felis donec.
          Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.
        </p>
      </article>
    </section>
  );
}
