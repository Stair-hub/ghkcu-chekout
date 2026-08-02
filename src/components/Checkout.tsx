import React, { useState } from 'react';

type PaymentMethod = 'card' | 'paypal' | 'crypto';

export default function Checkout() {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Paiement simulé avec succès !');
      window.location.href = '/index.html';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-midnight font-sans selection:bg-brand-copper selection:text-white pb-12">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
        <a href="/index.html" className="font-serif text-2xl font-semibold text-brand-midnight tracking-wide">
          AURA VITALITÉ
        </a>
        <a href="/index.html" className="text-slate-500 hover:text-brand-copper transition-colors font-medium">
          Retour à l'accueil
        </a>
      </header>

      <main className="max-w-6xl mx-auto mt-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: Visual & Product Description */}
        <div className="flex flex-col gap-8">
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 flex items-center justify-center p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 opacity-50"></div>
            <img 
              src="/ghkfoto.webp" 
              alt="Sérum Régénérant GHK-Cu" 
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          
          <div>
            <div className="text-brand-copper font-semibold tracking-widest uppercase text-sm mb-3">Soin Premium</div>
            <h1 className="text-4xl font-serif font-medium leading-tight mb-6">Sérum Régénérant GHK-Cu <br/><span className="text-slate-400 text-3xl">(Peptide de Cuivre)</span></h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              « Formule hautement concentrée en peptides de cuivre GHK-Cu [1]. Stimule la production de collagène et d'élastine, réduit visiblement les rides et raffermit l'ovale du visage. Texture légère à absorption rapide pour une régénération cellulaire intense. »
            </p>

          </div>
        </div>

        {/* Right Column: Payment Options */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 self-start">
          <h2 className="text-2xl font-serif font-medium mb-8">Méthode de paiement</h2>
          
          <div className="space-y-4 mb-10">
            {/* Option 1: Card */}
            <label className={`block border rounded-xl p-4 cursor-pointer transition-all duration-300 ${method === 'card' ? 'border-brand-copper bg-orange-50/30 shadow-md ring-1 ring-brand-copper/30' : 'border-slate-200 hover:border-brand-copper/50'}`}>
              <div className="flex items-center gap-4">
                <input type="radio" name="paymentMethod" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="w-5 h-5 text-brand-copper focus:ring-brand-copper" />
                <span className="font-medium text-lg">Carte de crédit</span>
                <div className="ml-auto flex gap-2">
                  <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">VISA</div>
                  <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">MC</div>
                </div>
              </div>
            </label>

            {/* Option 2: PayPal */}
            <label className={`block border rounded-xl p-4 cursor-pointer transition-all duration-300 ${method === 'paypal' ? 'border-blue-500 bg-blue-50/30 shadow-md ring-1 ring-blue-500/30' : 'border-slate-200 hover:border-blue-500/50'}`}>
              <div className="flex items-center gap-4">
                <input type="radio" name="paymentMethod" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} className="w-5 h-5 text-blue-600 focus:ring-blue-600" />
                <span className="font-medium text-lg">PayPal</span>
                <div className="ml-auto italic font-bold text-blue-700">PayPal</div>
              </div>
            </label>

            {/* Option 3: Crypto */}
            <label className={`block border rounded-xl p-4 cursor-pointer transition-all duration-300 ${method === 'crypto' ? 'border-emerald-500 bg-emerald-50/30 shadow-md ring-1 ring-emerald-500/30' : 'border-slate-200 hover:border-emerald-500/50'}`}>
              <div className="flex items-center gap-4">
                <input type="radio" name="paymentMethod" value="crypto" checked={method === 'crypto'} onChange={() => setMethod('crypto')} className="w-5 h-5 text-emerald-600 focus:ring-emerald-600" />
                <span className="font-medium text-lg">Crypto (BTC, ETH, USDT)</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs">💎</div>
                </div>
              </div>
            </label>
          </div>

          <form onSubmit={handlePayment}>
            {/* Dynamic System Simulators */}
            <div className="mb-10 min-h-[220px]">
              
              {/* Stripe Simulation */}
              {method === 'card' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Numéro de carte</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper outline-none transition-shadow font-mono" required />
                      <div className="absolute right-4 top-3.5 opacity-30">💳</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600">Expiration</label>
                      <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper outline-none transition-shadow font-mono" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-600">CVC</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper outline-none transition-shadow font-mono" required />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                    Paiement sécurisé par Stripe
                  </div>
                </div>
              )}

              {/* PayPal Simulation */}
              {method === 'paypal' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col items-center justify-center h-full space-y-6 pt-4">
                  <p className="text-slate-500 text-center text-sm">Vous allez être redirigé vers PayPal pour finaliser votre achat en toute sécurité.</p>
                  <button type="button" className="w-full max-w-sm bg-[#FFC439] hover:bg-[#F4BB33] text-[#003087] font-bold py-4 rounded-full transition-colors flex justify-center items-center gap-2 shadow-md">
                    <span className="italic">PayPal</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                    Protection des achats PayPal
                  </div>
                </div>
              )}

              {/* Crypto Simulation */}
              {method === 'crypto' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col items-center justify-center h-full space-y-6 pt-2">
                  <div className="w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                    <span className="text-slate-400 text-sm font-medium">Faux QR Code</span>
                  </div>
                  <p className="text-slate-500 text-center text-sm max-w-[250px]">Flashez le QR code ou connectez votre wallet Web3 pour payer via Coinbase Commerce.</p>
                  
                  <div className="w-full max-w-sm space-y-2">
                    <label className="text-sm font-medium text-slate-600">Votre clé publique (pour vérification)</label>
                    <input type="text" placeholder="ex: 0x123...abc" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper outline-none transition-shadow font-mono text-sm" />
                    <p className="text-xs text-brand-copper font-medium mt-1">⚠️ N'oubliez pas de nous envoyer le scan du paiement crypto.</p>
                  </div>

                  <button type="button" className="w-full max-w-sm bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-xl transition-colors shadow-lg">
                    Connecter le Wallet
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 mb-6 flex justify-between items-center py-4 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Total à régler</span>
              <span className="text-3xl font-semibold text-brand-midnight">120,00 €</span>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-5 rounded-xl font-medium text-lg transition-all duration-300 shadow-xl ${
                isProcessing 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                  : 'bg-brand-midnight text-white hover:bg-black hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {isProcessing ? 'Traitement sécurisé en cours...' : 'Valider et Payer'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-6">
              En validant votre paiement, vous acceptez nos <a href="#" className="underline hover:text-slate-600">Conditions Générales de Vente</a>.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
