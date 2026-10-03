import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DeviceStoreProvider } from './store/DeviceStore';
import { EventStoreProvider } from './store/EventStore';

import Home from './pages/Home';
import Auth from './pages/Auth';
import CriarEvento from './pages/CriarEvento';
import Plano from './pages/Plano';
import Painel from './pages/Painel';
import Evento from './pages/Evento';
import Fornecedores from './pages/Fornecedores';
import PerfilFornecedor from './pages/PerfilFornecedor';
import Carteira from './pages/Carteira';
import Convidados from './pages/Convidados';
import Convite from './pages/Convite';
import PainelFornecedor from './pages/PainelFornecedor';
import Avaliacao from './pages/Avaliacao';

export default function App() {
  return (
    <DeviceStoreProvider>
      <EventStoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth modo="login" />} />
            <Route path="/cadastro" element={<Auth modo="cadastro" />} />
            <Route path="/criar-evento" element={<CriarEvento />} />
            <Route path="/plano" element={<Plano />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="/evento" element={<Evento />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/fornecedor" element={<PerfilFornecedor />} />
            <Route path="/carteira" element={<Carteira />} />
            <Route path="/convidados" element={<Convidados />} />
            <Route path="/convite" element={<Convite />} />
            <Route path="/fornecedor-painel" element={<PainelFornecedor />} />
            <Route path="/avaliacao" element={<Avaliacao />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </EventStoreProvider>
    </DeviceStoreProvider>
  );
}
