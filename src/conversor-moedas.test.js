import { fireEvent, render, screen } from '@testing-library/react';
import ConversorMoedas from './conversor-moedas';
import ReactDOM from 'react-dom';
import axiosMock from 'axios';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de conversao de moedas', () => {

  it('deve rederizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConversorMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve simular uma conversao de moedas', async() => {
    /* findByTestId para requisação assinc*/
    const { findByTestId, getByTestId } = render(<ConversorMoedas />);
    axiosMock.get.mockResolvedValueOnce({
      data: {success: true, rates: {BRL:4.5654292, USD: 1.101049 }}
    });
    fireEvent.click(getByTestId('btn-converter'));
    const modal = await findByTestId('modal');
    expect(axiosMock.get).toHaveBeenCalledTimes(1); // verificar se a requesição foi chamada uma vez
    //expect(modal).toHaveTextContent('1 BRL = 0.24 USD');
  })

})


