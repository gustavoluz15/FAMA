import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import { trash, add, arrowForward } from 'ionicons/icons';

import './Orçamento.css';

interface ItemGasto {
  tipoGasto: string;
  descricao: string;
  valor: number;
}

const tiposDeGasto = ['Materiais', 'Mão de Obra', 'Documentação', 'Transporte', 'Outros'];

const descricaoPorTipoGasto: Record<string, string[]> = {
  'Mão de Obra': ['Engenheiro', 'Pedreiro', 'Outros'],
  'Materiais': ['Areia', 'Argamassa', 'Brita', 'Cimento', 'Cerâmica', 'Outros'],
  'Documentação': ['Documentação'],
  'Transporte': ['Transporte'],
  'Outros': ['Outros'],
};

const App: React.FC = () => {
  const [items, setItems] = useState<ItemGasto[]>([]);
  const [total, setTotal] = useState(0);
  const [popover, setShowPopover] = useState(false);
  const [selectedTipoGasto, setSelectedTipoGasto] = useState('');
  const [selectedDescricao, setSelectedDescricao] = useState('');
  const [selectedValor, setSelectedValor] = useState('');

  const handleAddItem = () => {
    if (selectedTipoGasto === '' || selectedDescricao === '' || selectedValor === '') {
      return; 
    }

    const newItem: ItemGasto = {
      tipoGasto: selectedTipoGasto,
      descricao: selectedDescricao,
      valor: parseFloat(selectedValor) || 0,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);


    setTotal((prevTotal) => prevTotal + newItem.valor);

    setShowPopover(false);
    setSelectedDescricao('');
    setSelectedValor('');
  };

  const handleTipoGastoChange = (value: string) => {
    setSelectedTipoGasto(value);

    setSelectedDescricao('');
    if (descricaoPorTipoGasto[value]) {
      setSelectedDescricao(descricaoPorTipoGasto[value][0]);
    }
  };

  const handleInputChange = (field: keyof ItemGasto, value: string | number) => {
    if (field === 'descricao') {
      setSelectedDescricao(value as string);
    } else if (field === 'valor') {
      setSelectedValor(value as string);
    }
  };

  const handleDeleteItem = (index: number) => {
    const deletedItem = items[index];
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);


    setTotal((prevTotal) => prevTotal - deletedItem.valor);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Orçamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPopover isOpen={popover} onDidDismiss={() => setShowPopover(false)}>
          <IonList>
            <IonItem>
              <IonLabel>Tipo de Gasto</IonLabel>
              <IonSelect
                value={selectedTipoGasto}
                onIonChange={(e) => handleTipoGastoChange(e.detail.value!)}
              >
                {tiposDeGasto.map((tipo, tipoIndex) => (
                  <IonSelectOption key={tipoIndex} value={tipo}>
                    {tipo}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {selectedTipoGasto !== 'Outros' && (
              <IonItem>
                <IonLabel>Descrição</IonLabel>
                <IonSelect
                  value={selectedDescricao}
                  onIonChange={(e) => handleInputChange('descricao', e.detail.value!)}
                >
                  {descricaoPorTipoGasto[selectedTipoGasto]?.map((descricao, descricaoIndex) => (
                    <IonSelectOption key={descricaoIndex} value={descricao}>
                      {descricao}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            <IonItem>
              <IonLabel>Valor</IonLabel>
              <IonInput
                type="number"
                value={selectedValor}
                onIonChange={(e) => handleInputChange('valor', e.detail.value!)}
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" onClick={handleAddItem}>
            Adicionar Item <IonIcon icon={arrowForward} />
          </IonButton>
        </IonPopover>

        <IonGrid>
          <IonRow class="table-header">
            <IonCol>Tipo de Gasto</IonCol>
            <IonCol>Descrição</IonCol>
            <IonCol>Valor</IonCol>
            <IonCol>Excluir</IonCol>
          </IonRow>
          {items.map((item, index) => (
            <IonRow class="table-row" key={index}>
              <IonCol>{item.tipoGasto}</IonCol>
              <IonCol>{item.descricao}</IonCol>
              <IonCol>{item.valor}</IonCol>
              <IonCol>
                <IonButton fill="clear" color="danger" onClick={() => handleDeleteItem(index)}>
                  <IonIcon icon={trash} size="small" />
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        <div className="button-center">
          <IonButton onClick={() => setShowPopover(true)} expand="block">
            <IonIcon icon={add} />
          </IonButton>
        </div>
        <div className="total-container">
          <IonText class="total-text">Total: R$</IonText>
          <IonText class="total-value">{total}</IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default App;

