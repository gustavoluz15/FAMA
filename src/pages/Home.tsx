import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router-dom'; 

import { home, list, construct, alarm, addCircle } from 'ionicons/icons';

const Page: React.FC = () => {
  const pageTitle = "𝐂𝐨𝐧𝐬𝐭𝐫𝐮𝐭𝐨𝐫𝐚 𝐅𝐚𝐦𝐚";
  const history = useHistory(); 


  const redirectToPage = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <img src="https://uploaddeimagens.com.br/images/004/614/482/full/FAMA.jfif?1695222211" alt="Imagem FAMA Construtora" />
            </IonCol>
          </IonRow>
          <IonRow className="separator">
            <IonCol>
              <hr />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <h1 className="red-text">Minhas Obras</h1>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="5.6" className="menu-item" onClick={() => redirectToPage('/pagina-total')}>
              <IonIcon icon={home} className="menu-icon" />
              <p className="menu-text">Total</p>
            </IonCol>
            <IonCol size="5.6" className="menu-item" onClick={() => redirectToPage('/AdicionarObra')}>
              <IonIcon icon={addCircle} className="menu-icon" />
              <p className="menu-text">Nova Obra</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5.6" className="menu-item" onClick={() => redirectToPage('/Orçamento')}>
              <IonIcon icon={construct} className="menu-icon" />
              <p className="menu-text">Orçamento</p>
            </IonCol>
            <IonCol size="5.6" className="menu-item" onClick={() => redirectToPage('/pagina-atrasadas')}>
              <IonIcon icon={alarm} className="menu-icon" />
              <p className="menu-text">Atrasadas</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Page;
