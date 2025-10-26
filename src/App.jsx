import React, { useState } from 'react';
import { Search, Menu, Edit, User, Shield, Package, BookOpen, MessageCircle, Plus, Eye, EyeOff, ChevronDown, Bold, Italic, Underline, Link, Image as ImageIcon, List, Table, Undo, Redo, Save, X } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleSearchTerm, setRoleSearchTerm] = useState('');

  // Mock data
  const mockRoles = [
    {
      id: 1,
      name: 'Aventuras Épicas',
      description: 'Juego de rol de fantasía épica en un mundo medieval',
      category: 'Acción y Aventura',
      imageUrl: 'https://placehold.co/100x100/4f46e5/ffffff?text=AE',
      whatsappLink: 'https://wa.me/1234567890',
      isPublished: true,
      color: 'bg-indigo-500',
      admin: { id: 1, name: 'Admin Principal' },
      players: 24,
      techniques: 15,
      items: 42
    },
    {
      id: 2,
      name: 'Misterio Nocturno',
      description: 'Investigación de crímenes sobrenaturales en la ciudad',
      category: 'Misterio',
      imageUrl: 'https://placehold.co/100x100/dc2626/ffffff?text=MN',
      whatsappLink: 'https://wa.me/0987654321',
      isPublished: true,
      color: 'bg-red-500',
      admin: { id: 2, name: 'Detective Jefe' },
      players: 18,
      techniques: 8,
      items: 23
    },
    {
      id: 3,
      name: 'Ciencia Ficción Galáctica',
      description: 'Exploración espacial y batallas interestelares',
      category: 'Ciencia Ficción',
      imageUrl: 'https://placehold.co/100x100/059669/ffffff?text=CFG',
      whatsappLink: 'https://wa.me/1122334455',
      isPublished: false,
      color: 'bg-emerald-500',
      admin: { id: 3, name: 'Capitán Estelar' },
      players: 12,
      techniques: 22,
      items: 67
    }
  ];

  const mockContent = {
    guide: '## Guía del Rol\n\nBienvenidos a **Aventuras Épicas**! Aquí encontrarás todas las reglas y mecánicas del juego.\n\n### Reglas Básicas\n- Cada jugador controla un personaje único\n- Las decisiones afectan la historia\n- Respeta a otros jugadores\n\n### Sistema de Combate\nUtilizamos un sistema de dados D20 para resolver conflictos.',
    blog: '## Últimas Actualizaciones\n\n### Nueva Temporada\n¡Comienza la temporada 2 con nuevos desafíos y recompensas!\n\n### Evento Especial\nEste fin de semana tendremos un evento especial con recompensas exclusivas.',
    players: [
      { id: 1, name: 'Guerrero Valiente', level: 5, class: 'Guerrero' },
      { id: 2, name: 'Mago Sabio', level: 4, class: 'Mago' },
      { id: 3, name: 'Ladrón Sigiloso', level: 3, class: 'Ladrón' }
    ],
    techniques: [
      { id: 1, name: 'Golpe Poderoso', type: 'Ataque', cost: '20 MP' },
      { id: 2, name: 'Escudo Mágico', type: 'Defensa', cost: '15 MP' },
      { id: 3, name: 'Curación Menor', type: 'Soporte', cost: '10 MP' }
    ],
    items: [
      { id: 1, name: 'Espada Legendaria', type: 'Arma', rarity: 'Épico' },
      { id: 2, name: 'Poción de Vida', type: 'Consumible', rarity: 'Común' },
      { id: 3, name: 'Amuleto de Protección', type: 'Accesorio', rarity: 'Raro' }
    ]
  };

  const [content, setContent] = useState(mockContent);

  // Filter roles based on search term
  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentView('role');
  };

  const handlePublishToggle = (role) => {
    console.log(`Toggling publish status for role: ${role.name}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setContent(mockContent);
  };

  const renderEditorToolbar = () => (
    <div className="flex flex-wrap gap-2 p-3 bg-gray-100 border-b border-gray-200">
      <button className="p-2 hover:bg-gray-200 rounded"><Bold size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Italic size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Underline size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Link size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><ImageIcon size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><List size={16} /></button>
      <button className="p-2 hover:bg-gray-200 rounded"><Table size={16} /></button>
    </div>
  );

  const RoleCard = ({ role }) => (
    <div 
      className={`${role.color} text-white rounded-lg p-4 mb-4 cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-lg`}
      onClick={() => handleRoleSelect(role)}
    >
      <div className="flex items-center mb-3">
        <img 
          src={role.imageUrl} 
          alt={role.name}
          className="w-12 h-12 rounded-full mr-3 border-2 border-white"
        />
        <div>
          <h3 className="font-bold text-lg">{role.name}</h3>
          <p className="text-sm opacity-90">{role.category}</p>
        </div>
        {!role.isPublished && (
          <span className="ml-auto bg-gray-800 text-xs px-2 py-1 rounded">No publicado</span>
        )}
      </div>
      <p className="text-sm opacity-90">{role.description}</p>
      <div className="flex justify-between items-center mt-3 text-xs opacity-75">
        <span>{role.players} jugadores</span>
        <span>{role.techniques} técnicas</span>
        <span>{role.items} objetos</span>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">RolHub: Juegos de rol en WhatsApp</h1>
        <p className="text-gray-600">Descubre y gestiona tus juegos de rol favoritos</p>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {filteredRoles.map(role => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      {!filteredRoles.length && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron roles que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );

  const RolePage = () => {
    if (!selectedRole) return null;

    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* Role Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={selectedRole.imageUrl} 
                alt={selectedRole.name}
                className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedRole.name}</h2>
                <p className="text-gray-600">{selectedRole.category}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentUser && (
                <>
                  <button 
                    onClick={handleEditClick}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handlePublishToggle(selectedRole)}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      selectedRole.isPublished 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {selectedRole.isPublished ? <Eye size={16} className="mr-2" /> : <EyeOff size={16} className="mr-2" />}
                    {selectedRole.isPublished ? 'Publicado' : 'No publicado'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-1" />
                <span>{selectedRole.players} jugadores</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield size={16} className="mr-1" />
                <span>{selectedRole.techniques} técnicas</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Package size={16} className="mr-1" />
                <span>{selectedRole.items} objetos</span>
              </div>
            </div>
            
            <a 
              href={selectedRole.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={18} className="mr-2" />
              Unirse al grupo
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            {['players', 'techniques', 'items', 'guide', 'blog'].map((tab) => (
              <button
                key={tab}
                className="flex-1 py-4 px-2 text-center font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              >
                {tab === 'players' && <><User className="inline mr-2" /> Jugadores</>}
                {tab === 'techniques' && <><Shield className="inline mr-2" /> Técnicas</>}
                {tab === 'items' && <><Package className="inline mr-2" /> Objetos</>}
                {tab === 'guide' && <><BookOpen className="inline mr-2" /> Guía</>}
                {tab === 'blog' && <><MessageCircle className="inline mr-2" /> Blog</>}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {isEditing ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded"><Undo size={16} /></button>
                    <button className="p-2 hover:bg-gray-200 rounded"><Redo size={16} /></button>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSaveEdit}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Save size={16} className="mr-2" /> Guardar
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      <X size={16} className="mr-2" /> Cancelar
                    </button>
                  </div>
                </div>
                {renderEditorToolbar()}
                <div className="p-4 min-h-96">
                  <textarea
                    value={content.guide}
                    onChange={(e) => setContent({...content, guide: e.target.value})}
                    className="w-full h-64 p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Edita la guía del rol..."
                  />
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold mb-4">Guía del Rol</h2>
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: content.guide
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/## (.*?)(?=\n|$)/g, '<h3>$1</h3>')
                    .replace(/### (.*?)(?=\n|$)/g, '<h4>$1</h4>')
                    .replace(/\n/g, '<br>')
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Tu nombre de usuario"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Tu contraseña"
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de teléfono o Google</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Número de teléfono o cuenta de Google"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {authMode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">¿Necesitas ayuda?</p>
          <a 
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-800"
          >
            <MessageCircle size={16} className="mr-2" />
            Contactar al administrador
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-900 mr-2">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              RolHub
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <img 
                  src="https://placehold.co/32x32/4f46e5/ffffff?text=U" 
                  alt="Usuario"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentUser}
                </span>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentView === 'home' && <HomePage />}
        {currentView === 'role' && <RolePage />}
      </main>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}

      {/* SEO Meta Tags */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "RolHub: Juegos de rol en WhatsApp",
          "description": "Plataforma para crear y gestionar juegos de rol en WhatsApp",
          "applicationCategory": "Game",
          "offers": {
            "@type": "Offer",
            "price": "0"
          }
        })}
      </script>
    </div>
  );
};

export default App;
