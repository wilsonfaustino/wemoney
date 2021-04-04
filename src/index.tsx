import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Mock de Dados Entrada',
          type: 'income',
          category: 'Any',
          amount: 5000,
          createdAt: new Date('2021-04-01 04:00:00')
        },
        {
          id: 2,
          title: 'Mock de Dados Saída',
          type: 'outcome',
          category: 'Condominio',
          amount: 1180,
          createdAt: new Date('2021-04-10 04:00:00')
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
