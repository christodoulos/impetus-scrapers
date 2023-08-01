import { JSDOM } from "jsdom";

export function getMeteoclubUrls(): string[] {
  const htmlString = `
<li class="havechild menu-item4 havechild">
  <a
    href="/meteorologikoi-stathmoi"
    target="_blank"
    class="menu-item4 haschild"
    id="menu551"
    title="Μετ.σταθμοί"
    ><span class="menu-title">Μετ.σταθμοί</span></a
  >
  <ul>
    <li class="havesubchild first-item havesubchild">
      <a href="#" class="first-item haschild" id="menu559" title="Αττική"
        ><span class="menu-title">Αττική</span></a
      >
      <ul>
        <li class="havesubchild first-item havesubchild">
          <a
            href="#"
            class="first-item haschild"
            id="menu636"
            title="Βόρεια Προάστεια"
            ><span class="menu-title">Βόρεια Προάστεια</span></a
          >
          <ul>
            <li class="first-item">
              <a
                href="http://likovrisi.meteoclub.gr"
                target="_blank"
                class="first-item"
                id="menu708"
                title="Λυκόβρυση"
                ><span class="menu-title">Λυκόβρυση</span></a
              >
            </li>
            <li>
              <a
                href="http://maroussi.meteoclub.gr"
                target="_blank"
                id="menu1449"
                title="Μαρούσι"
                ><span class="menu-title">Μαρούσι</span></a
              >
            </li>
            <li>
              <a
                href="http://neaionia.meteoclub.gr"
                target="_blank"
                id="menu1492"
                title="Νέα Ιωνία"
                ><span class="menu-title">Νέα Ιωνία</span></a
              >
            </li>
            <li>
              <a
                href="http://chalandri.meteoclub.gr"
                target="_blank"
                id="menu686"
                title="Χαλάνδρι"
                ><span class="menu-title">Χαλάνδρι</span></a
              >
            </li>
            <li>
              <a
                href="http://chalandri2.meteoclub.gr"
                id="menu1447"
                title="Χαλάνδρι 2 "
                ><span class="menu-title">Χαλάνδρι 2 </span></a
              >
            </li>
            <li class="last-item">
              <a
                href="http://chalandri-davis.meteoclub.gr"
                target="_blank"
                class="last-item"
                id="menu1557"
                title="Χαλάνδρι - Davis"
                ><span class="menu-title">Χαλάνδρι - Davis</span></a
              >
            </li>
          </ul>
        </li>
        <li class="havesubchild havesubchild">
          <a href="#" class="haschild" id="menu637" title="Κέντρο"
            ><span class="menu-title">Κέντρο</span></a
          >
          <ul>
            <li class="first-item">
              <a
                href="http://galatsi.meteoclub.gr"
                target="_blank"
                class="first-item"
                id="menu698"
                title="Γαλάτσι"
                ><span class="menu-title">Γαλάτσι</span></a
              >
            </li>
            <li>
              <a
                href="http://galatsi-davis.meteoclub.gr/"
                target="_blank"
                id="menu1225"
                title="Γαλάτσι Davis"
                ><span class="menu-title">Γαλάτσι Davis</span></a
              >
            </li>
            <li class="last-item">
              <a
                href="http://pagrati-athina.meteoclub.gr"
                target="_blank"
                class="last-item"
                id="menu715"
                title="Παγκράτι"
                ><span class="menu-title">Παγκράτι</span></a
              >
            </li>
          </ul>
        </li>
        <li class="havesubchild havesubchild">
          <a href="#" class="haschild" id="menu638" title="Nότια Προάστεια"
            ><span class="menu-title">Nότια Προάστεια</span></a
          >
          <ul>
            <li class="first-item">
              <a
                href="http://agios-dimitrios.meteoclub.gr/"
                target="_blank"
                class="first-item"
                id="menu1201"
                title="Αγιος Δημήτριος (Μπραχάμι)"
                ><span class="menu-title">Αγιος Δημήτριος (Μπραχάμι)</span></a
              >
            </li>
            <li>
              <a
                href="http://voula.meteoclub.gr"
                target="_blank"
                id="menu1414"
                title="Βούλα"
                ><span class="menu-title">Βούλα</span></a
              >
            </li>
            <li>
              <a
                href="http://ilioupoli-davis.meteoclub.gr/"
                target="_blank"
                id="menu1547"
                title="Ηλιούπολη Davis"
                ><span class="menu-title">Ηλιούπολη Davis</span></a
              >
            </li>
            <li>
              <a
                href="http://ilioupoli.meteoclub.gr/"
                target="_blank"
                id="menu1548"
                title="Ηλιούπολη"
                ><span class="menu-title">Ηλιούπολη</span></a
              >
            </li>
            <li class="last-item">
              <a
                href="http://pireas.meteoclub.gr"
                target="_blank"
                class="last-item"
                id="menu728"
                title="Πειραιάς"
                ><span class="menu-title">Πειραιάς</span></a
              >
            </li>
          </ul>
        </li>
        <li class="havesubchild havesubchild">
          <a href="#" class="haschild" id="menu639" title="Δυτικά προάστεια"
            ><span class="menu-title">Δυτικά προάστεια</span></a
          >
          <ul>
            <li class="first-item">
              <a
                href="http://agioi-anargyroi.meteoclub.gr/"
                target="_blank"
                class="first-item"
                id="menu1231"
                title="Αγιοι Ανάργυροι"
                ><span class="menu-title">Αγιοι Ανάργυροι</span></a
              >
            </li>
            <li>
              <a
                href="http://aigaleo-davis.meteoclub.gr"
                target="_blank"
                id="menu676"
                title="Αιγάλεω-Davis"
                ><span class="menu-title">Αιγάλεω-Davis</span></a
              >
            </li>
            <li>
              <a
                href="http://keratsini-davis.meteoclub.gr"
                target="_blank"
                id="menu1553"
                title="Κερατσίνι Davis"
                ><span class="menu-title">Κερατσίνι Davis</span></a
              >
            </li>
            <li>
              <a
                href="http://neapoli-nikaia.meteoclub.gr"
                target="_blank"
                id="menu705"
                title="Νεάπολη - Νίκαια"
                ><span class="menu-title">Νεάπολη - Νίκαια</span></a
              >
            </li>
            <li>
              <a
                href="http://nikaia.meteoclub.gr"
                target="_blank"
                id="menu710"
                title="Νίκαια - Περιβολάκι"
                ><span class="menu-title">Νίκαια - Περιβολάκι</span></a
              >
            </li>
            <li>
              <a
                href="http://nikaia-davis.meteoclub.gr"
                target="_blank"
                id="menu712"
                title="Νίκαια - Davis"
                ><span class="menu-title">Νίκαια - Davis</span></a
              >
            </li>
            <li class="last-item">
              <a
                href="http://petroupoli.meteoclub.gr/"
                target="_blank"
                class="last-item"
                id="menu1454"
                title="Πετρούπολη"
                ><span class="menu-title">Πετρούπολη</span></a
              >
            </li>
          </ul>
        </li>
        <li class="havesubchild last-item havesubchild">
          <a
            href="#"
            class="last-item haschild"
            id="menu640"
            title="Υπόλοιπη Αττική"
            ><span class="menu-title">Υπόλοιπη Αττική</span></a
          >
          <ul>
            <li class="first-item">
              <a
                href="http://alepochori.meteoclub.gr"
                target="_blank"
                class="first-item"
                id="menu641"
                title="Αλεποχώρι"
                ><span class="menu-title">Αλεποχώρι</span></a
              >
            </li>
            <li>
              <a
                href="http://anodioni-pikermi.meteoclub.gr/"
                target="_blank"
                id="menu1453"
                title="Άνω Διώνη - Πικέρμι"
                ><span class="menu-title">Άνω Διώνη - Πικέρμι</span></a
              >
            </li>
            <li>
              <a
                href="http://anoliosia.meteoclub.gr"
                target="_blank"
                id="menu1049"
                title="Ανω Λιόσια"
                ><span class="menu-title">Ανω Λιόσια</span></a
              >
            </li>
            <li>
              <a
                href="http://avlonas.meteoclub.gr/"
                target="_blank"
                id="menu1223"
                title="Αυλώνας"
                ><span class="menu-title">Αυλώνας</span></a
              >
            </li>
            <li>
              <a
                href="http://dionysos-penteli.meteoclub.gr"
                target="_blank"
                id="menu696"
                title="Διόνυσος"
                ><span class="menu-title">Διόνυσος</span></a
              >
            </li>
            <li>
              <a
                href="http://thrakomakedones.meteoclub.gr"
                target="_blank"
                id="menu1552"
                title="Θρακομακεδόνες"
                ><span class="menu-title">Θρακομακεδόνες</span></a
              >
            </li>
            <li>
              <a
                href="http://meteo.scienceontheweb.net/"
                target="_blank"
                id="menu1169"
                title="Ιπποκράτειος Πολιτεία"
                ><span class="menu-title">Ιπποκράτειος Πολιτεία</span></a
              >
            </li>
            <li>
              <a
                href="http://lavrio.meteoclub.gr"
                target="_blank"
                id="menu724"
                title="Λαύριο"
                ><span class="menu-title">Λαύριο</span></a
              >
            </li>
            <li>
              <a
                href="http://marathonas.meteoclub.gr"
                target="_blank"
                id="menu680"
                title="Μαραθώνας"
                ><span class="menu-title">Μαραθώνας</span></a
              >
            </li>
            <li>
              <a
                href="http://markopoulo-oropos.meteoclub.gr"
                target="_blank"
                id="menu1310"
                title="Μαρκόπουλο Ωρωπού"
                ><span class="menu-title">Μαρκόπουλο Ωρωπού</span></a
              >
            </li>
            <li>
              <a
                href="http://mandra.meteoclub.gr"
                target="_blank"
                id="menu1540"
                title="Μάνδρα"
                ><span class="menu-title">Μάνδρα</span></a
              >
            </li>
            <li>
              <a
                href="http://menidi-davis.meteoclub.gr"
                target="_blank"
                id="menu893"
                title="Μενίδι Davis"
                ><span class="menu-title">Μενίδι Davis</span></a
              >
            </li>
            <li>
              <a
                href="http://portoraftimeteo.gr/"
                target="_blank"
                id="menu1532"
                title="Πόρτο Ράφτη"
                ><span class="menu-title">Πόρτο Ράφτη</span></a
              >
            </li>
            <li class="last-item">
              <a
                href="http://fyli.meteoclub.gr"
                target="_blank"
                class="last-item"
                id="menu691"
                title="Φυλή"
                ><span class="menu-title">Φυλή</span></a
              >
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</li>
`;
  const dom = new JSDOM(htmlString);
  const links = dom.window.document.getElementsByTagName("a");
  const urls = [];
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.startsWith("http")) {
      urls.push(links[i].href);
    }
  }
  console.log(urls.length);
  return urls;
}

getMeteoclubUrls();
