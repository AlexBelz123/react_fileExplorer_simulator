import React from 'react';
import styled from 'styled-components';

type TOrder = 'asc' | 'desc'; // fix (DRY)
interface IOrders {
  // fix (DRY)
  name: TOrder;
  date: TOrder;
  size: TOrder;
}

interface PanelProps {
  goBack: () => void;
  orders: IOrders;
  sortByKey: (k: string, order: TOrder) => void;
  disabled: boolean;
}

const Panel: React.FC<PanelProps> = ({
  goBack,
  orders,
  sortByKey,
  disabled,
}) => {
  const nameOrder = orders.name === 'asc' ? 'desc' : 'asc';
  const dateOrder = orders.date === 'asc' ? 'desc' : 'asc';
  const sizeOrder = orders.size === 'asc' ? 'desc' : 'asc';

  return (
    <StyledPanel disabled={disabled}>
      <StyledBack onClick={goBack}>&#8617;</StyledBack>
      <StyledPanelItem onClick={() => sortByKey('name', nameOrder)}>
        Name {orders.name === 'asc' ? <>&#8593;</> : <>&#8595;</>}
      </StyledPanelItem>
      <StyledPanelItem onClick={() => sortByKey('date', dateOrder)}>
        Date {orders.date === 'asc' ? <>&#8593;</> : <>&#8595;</>}
      </StyledPanelItem>
      <StyledPanelItem onClick={() => sortByKey('size', sizeOrder)}>
        Size {orders.size === 'asc' ? <>&#8593;</> : <>&#8595;</>}
      </StyledPanelItem>
    </StyledPanel>
  );
};

const StyledPanel = styled.div<{ disabled: boolean }>`
  height: 45px;
  padding: 10px;
  display: flex;
  align-items: center;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  opacity: ${(props) => (props.disabled ? 0.35 : 1)};

  & > button,
  *:not(:last-of-type) {
    margin-right: 20px;
  }
`;

const StyledPanelItem = styled.button`
  padding: 3px 8px;
  border-right: 1px solid grey;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

const StyledBack = styled.button`
  font-size: 60px;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

export default Panel;
