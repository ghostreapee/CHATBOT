<!DOCTYPE html>
<html lang="es" class="h-full bg-slate-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RutaEcuador - Asesor de Buses Intercantonales</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Marked.js for rendering markdown responses -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            500: '#0284c7',
                            600: '#0369a1',
                            700: '#075985',
                            900: '#0c4a6e',
                        },
                        accent: {
                            500: '#f59e0b',
                            600: '#d97706',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .chat-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 3px;
        }
        .animate-bounce-slow {
            animation: bounce 1.5s infinite;
        }
    </style>
</head>
<body class="h-full flex flex-col font-sans text-slate-800 antialiased">

    <!-- Header Navigation -->
    <header class="bg-brand-700 text-white shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-3">
                    <div class="bg-amber-400 text-brand-900 p-2.5 rounded-xl font-bold shadow-inner">
                        <i class="fa-solid font-black fa-bus-simple text-xl"></i>
                    </div>
                    <div>
                        <h1 class="font-extrabold text-lg sm:text-xl tracking-tight">RutaEcuador AI</h1>
                        <p class="text-xs text-brand-100 hidden sm:block">Asesor Inteligente de Transporte Intercantonal</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <nav class="flex space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium">
                    <button onclick="switchTab('chat')" id="tab-chat" class="px-3 py-2 rounded-lg bg-brand-800 text-white transition flex items-center space-x-1.5 shadow-sm">
                        <i class="fa-solid fa-comments"></i>
                        <span class="hidden md:inline">Chat Asesor</span>
                    </button>
                    <button onclick="switchTab('search')" id="tab-search" class="px-3 py-2 rounded-lg hover:bg-brand-600 text-brand-100 transition flex items-center space-x-1.5">
                        <i class="fa-solid fa-route"></i>
                        <span class="hidden md:inline">Buscar Rutas</span>
                    </button>
                    <button onclick="switchTab('booking')" id="tab-booking" class="px-3 py-2 rounded-lg hover:bg-brand-600 text-brand-100 transition flex items-center space-x-1.5">
                        <i class="fa-solid fa-ticket"></i>
                        <span class="hidden md:inline">Reserva Express</span>
                    </button>
                    <button onclick="switchTab('terminals')" id="tab-terminals" class="px-3 py-2 rounded-lg hover:bg-brand-600 text-brand-100 transition flex items-center space-x-1.5">
                        <i class="fa-solid fa-building-flag"></i>
                        <span class="hidden md:inline">Terminales</span>
                    </button>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 gap-6 overflow-hidden">

        <!-- TAB 1: CHATBOT ASESOR -->
        <section id="sec-chat" class="h-[calc(100vh-110px)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <!-- Chat Header -->
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h2 class="font-bold text-slate-800 text-sm sm:text-base">Asistente Virtual de Rutas</h2>
                        <p class="text-xs text-slate-500">Responde sobre cooperativas, horarios, turnos y costos</p>
                    </div>
                </div>
                <button onclick="clearChat()" class="text-xs text-slate-500 hover:text-red-600 px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition">
                    <i class="fa-solid fa-trash-can mr-1"></i>Limpiar
                </button>
            </div>

            <!-- Quick Suggestions Chips -->
            <div class="p-2 sm:p-3 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
                <span class="text-slate-500 font-medium whitespace-nowrap text-2xs uppercase tracking-wider pl-1">Sugerencias:</span>
                <button onclick="sendQuickPrompt('¿Qué buses van de Quito a Sangolquí y cuáles son sus horarios?')" class="bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition">
                    🚌 Quito ➔ Sangolquí
                </button>
                <button onclick="sendQuickPrompt('¿Cómo ir de Esmeraldas a Atacames o Tonsupa, precios y cooperativas?')" class="bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition">
                    🏖️ Esmeraldas ➔ Atacames
                </button>
                <button onclick="sendQuickPrompt('¿Cuáles son los buses de Guayaquil a Durán y Milagro?')" class="bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition">
                    🏙️ Guayaquil ➔ Milagro
                </button>
                <button onclick="sendQuickPrompt('¿Qué descuentos aplican para estudiantes, tercera edad y discapacitados?')" class="bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition">
                    🏷️ Descuentos de Ley
                </button>
            </div>

            <!-- Chat Messages Container -->
            <div id="chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4 chat-scroll bg-slate-50/50">
                <!-- Welcome Message -->
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-1">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs max-w-2xl text-sm leading-relaxed">
                        <p class="font-semibold text-brand-700 mb-1">¡Hola! Soy tu Asesor de Buses Intercantonales 🇪🇨</p>
                        <p class="text-slate-600">Puedo ayudarte a encontrar horarios, precios estimados, cooperativas de transporte y consejos para viajar entre cantones y provincias de Ecuador.</p>
                        <p class="text-slate-500 text-xs mt-2 italic">Ejemplo: "¿Qué bus me lleva de Ambato a Baños de Agua Santa y cuánto cuesta el pasaje?"</p>
                    </div>
                </div>
            </div>

            <!-- Chat Typing Indicator -->
            <div id="chat-typing" class="hidden px-4 py-2 bg-slate-50 text-xs text-slate-500 flex items-center space-x-2 border-t border-slate-100">
                <i class="fa-solid fa-spinner fa-spin text-brand-600"></i>
                <span>RutaEcuador AI está consultando la información de rutas...</span>
            </div>

            <!-- Chat Input Form -->
            <div class="p-3 sm:p-4 bg-white border-t border-slate-200">
                <form id="chat-form" onsubmit="handleChatSubmit(event)" class="flex gap-2">
                    <input type="text" id="chat-input" placeholder="Pregunta sobre rutas, cooperativas o destinos..." 
                           class="flex-1 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-sm transition">
                    <button type="submit" id="chat-send-btn" class="bg-brand-600 hover:bg-brand-700 active:scale-95 text-white px-5 py-3 rounded-xl font-medium text-sm transition flex items-center justify-center space-x-1 shadow-sm">
                        <span>Enviar</span>
                        <i class="fa-solid fa-paper-plane text-xs"></i>
                    </button>
                </form>
            </div>
        </section>

        <!-- TAB 2: BUSCADOR DE RUTAS -->
        <section id="sec-search" class="hidden space-y-6">
            <!-- Search Filters Card -->
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-magnifying-glass text-brand-600"></i> Buscador Directo de Frecuencias
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Origen (Cantón/Provincia)</label>
                        <div class="relative">
                            <i class="fa-solid fa-location-dot absolute left-3 top-3.5 text-slate-400"></i>
                            <select id="search-origin" class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                                <option value="todos">Todos los Orígenes</option>
                                <option value="Quito">Quito (Pichincha)</option>
                                <option value="Guayaquil">Guayaquil (Guayas)</option>
                                <option value="Esmeraldas">Esmeraldas (Esmeraldas)</option>
                                <option value="Ambato">Ambato (Tungurahua)</option>
                                <option value="Cuenca">Cuenca (Azuay)</option>
                                <option value="Ibarra">Ibarra (Imbabura)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Destino (Cantón)</label>
                        <div class="relative">
                            <i class="fa-solid fa-flag-checkered absolute left-3 top-3.5 text-slate-400"></i>
                            <select id="search-destination" class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                                <option value="todos">Todos los Destinos</option>
                                <option value="Sangolqui">Rumiñahui / Sangolquí</option>
                                <option value="Atacames">Atacames / Tonsupa</option>
                                <option value="Duran">Durán</option>
                                <option value="Banos">Baños de Agua Santa</option>
                                <option value="Otavalo">Otavalo</option>
                                <option value="Gualaceo">Gualaceo</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-end">
                        <button onclick="filterRoutes()" class="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition shadow-sm flex items-center justify-center gap-2">
                            <i class="fa-solid fa-filter"></i> Filtrar Horarios
                        </button>
                    </div>
                </div>
            </div>

            <!-- Route Results List -->
            <div id="routes-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Cards will be populated by JS -->
            </div>
        </section>

        <!-- TAB 3: RESERVA EXPRESS Y SELECCIÓN DE ASIENTOS -->
        <section id="sec-booking" class="hidden space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 class="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <i class="fa-solid fa-bus-sharp text-brand-600"></i> Selección de Asiento y Pre-Reserva
                </h2>
                <p class="text-xs text-slate-500 mb-6">Elige tu ruta y selecciona tu asiento preferido para generar un boleto digital demostrativo.</p>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <!-- Left Config -->
                    <div class="lg:col-span-5 space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Seleccionar Ruta</label>
                            <select id="booking-route-select" onchange="updateBookingDetails()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                                <option value="1">Quito ➔ Sangolquí ($0.85) - Coop. Los Chillos</option>
                                <option value="2">Esmeraldas ➔ Atacames ($1.50) - Coop. Del Pacífico</option>
                                <option value="3">Guayaquil ➔ Durán ($0.50) - Coop. Eloy Alfaro</option>
                                <option value="4">Ambato ➔ Baños ($1.25) - Coop. Baños</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Tipo de Pasajero</label>
                            <select id="booking-passenger-type" onchange="calculateFare()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                                <option value="1">Pasaje General (100%)</option>
                                <option value="0.5">Tercera Edad (50% desc.)</option>
                                <option value="0.5">Estudiante / Menor (50% desc.)</option>
                                <option value="0.5">Personas con Discapacidad (50% desc.)</option>
                            </select>
                        </div>

                        <div class="p-4 bg-brand-50 rounded-xl border border-brand-100 space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-slate-600">Asiento Seleccionado:</span>
                                <span id="selected-seat-label" class="font-bold text-brand-700">Ninguno</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-600">Valor Unitario:</span>
                                <span id="fare-base" class="font-semibold">$0.85</span>
                            </div>
                            <div class="flex justify-between pt-2 border-t border-brand-200 text-base font-bold">
                                <span>Total a Pagar:</span>
                                <span id="fare-total" class="text-brand-700">$0.85</span>
                            </div>
                        </div>

                        <button onclick="generateDigitalTicket()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                            <i class="fa-solid fa-qrcode"></i> Generar Boleto Digital
                        </button>
                    </div>

                    <!-- Right Seat Layout -->
                    <div class="lg:col-span-7 bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
                        <div class="w-full max-w-xs bg-white rounded-t-3xl border-2 border-slate-300 p-4 relative shadow-sm">
                            <!-- Driver Header -->
                            <div class="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 text-xs text-slate-500">
                                <div><i class="fa-solid fa-steering-wheel text-lg text-slate-700"></i> Chofer</div>
                                <div class="text-2xs bg-slate-200 px-2 py-0.5 rounded uppercase font-bold">Puerta</div>
                            </div>

                            <!-- Seats Grid (4 seats per row) -->
                            <div id="bus-seat-grid" class="grid grid-cols-5 gap-2 text-xs">
                                <!-- Generated dynamically -->
                            </div>
                        </div>

                        <div class="flex items-center gap-4 text-xs mt-4">
                            <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-slate-200 border rounded"></span> Libre</div>
                            <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-brand-600 border rounded"></span> Seleccionado</div>
                            <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-slate-400 border rounded"></span> Ocupado</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal for Generated Ticket -->
            <div id="ticket-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs hidden z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100">
                    <div class="text-center border-b pb-4">
                        <div class="inline-block p-3 bg-brand-100 text-brand-700 rounded-full mb-2">
                            <i class="fa-solid fa-ticket text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-lg text-slate-800">Boleto Digital Ecuador</h3>
                        <p class="text-xs text-slate-500" id="ticket-coop-name">Cooperativa Los Chillos</p>
                    </div>

                    <div class="space-y-2 text-xs text-slate-600">
                        <div class="flex justify-between"><span>Ruta:</span><strong id="ticket-route" class="text-slate-800">Quito ➔ Sangolquí</strong></div>
                        <div class="flex justify-between"><span>Asiento:</span><strong id="ticket-seat" class="text-brand-600 text-sm">N° 12</strong></div>
                        <div class="flex justify-between"><span>Fecha/Hora:</span><span id="ticket-datetime">Hoy - Salida Inmediata</span></div>
                        <div class="flex justify-between"><span>Monto:</span><strong id="ticket-price" class="text-slate-800">$0.85</strong></div>
                    </div>

                    <div class="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center border border-dashed border-slate-300">
                        <!-- Simulated QR Code -->
                        <div class="w-32 h-32 bg-white p-2 border rounded shadow-2xs flex items-center justify-center">
                            <i class="fa-solid fa-qrcode text-7xl text-slate-800"></i>
                        </div>
                        <span class="text-2xs text-slate-400 mt-2">Escanea este código al abordar</span>
                    </div>

                    <button onclick="closeTicketModal()" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm transition">
                        Cerrar y Guardar
                    </button>
                </div>
            </div>
        </section>

        <!-- TAB 4: DIRECTORIO DE TERMINALES TERRESTRES -->
        <section id="sec-terminals" class="hidden space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 class="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <i class="fa-solid fa-building-user text-brand-600"></i> Principales Terminales Terrestres de Ecuador
                </h2>
                <p class="text-xs text-slate-500 mb-6">Información útil de puntos de partida y conexión intercantonal e interprovincial.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Terminal Quito Quitumbe -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded font-bold uppercase">Quito - Sur</span>
                        <h3 class="font-bold text-slate-800">Terminal Terrestre Quitumbe</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Av. Cóndor Ñan y Mariscal Sucre</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Conexión: Metro de Quito / Trolebús</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Latacunga, Ambato, Baños, Cuenca, Guayaquil, Valles de Quito.</p>
                    </div>

                    <!-- Terminal Quito Carcelén -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded font-bold uppercase">Quito - Norte</span>
                        <h3 class="font-bold text-slate-800">Terminal Terrestre Carcelén</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Av. Galo Plaza Lasso y N74</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Conexión: Metrobús Q</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Otavalo, Ibarra, Tulcán, Cayambe, Esmeraldas.</p>
                    </div>

                    <!-- Terminal Guayaquil -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">Guayaquil</span>
                        <h3 class="font-bold text-slate-800">Terminal Jaime Roldós Aguilera</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Av. Bjamín Rosales y Las Américas</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Conexión: Aerovía / Metrovía</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Durán, Milagro, Salinas, Manta, Machala, Daule.</p>
                    </div>

                    <!-- Terminal Esmeraldas -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">Esmeraldas</span>
                        <h3 class="font-bold text-slate-800">Terminal Terrestre Verdeafro</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Sector Vuelta Larga / Sur de la Ciudad</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Cooperativas: Del Pacífico, Trans Esmeraldas</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Atacames, Tonsupa, Muisne, Quinindé, San Lorenzo.</p>
                    </div>

                    <!-- Terminal Ambato -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded font-bold uppercase">Ambato</span>
                        <h3 class="font-bold text-slate-800">Terminal Terrestre Ingahurco</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Av. Colombia y las Américas</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Cooperativas: Baños, San Francisco</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Baños, Pelileo, Píllaro, Quito, Puyo.</p>
                    </div>

                    <!-- Terminal Cuenca -->
                    <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition bg-slate-50 space-y-2">
                        <span class="text-2xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold uppercase">Cuenca</span>
                        <h3 class="font-bold text-slate-800">Terminal Terrestre de Cuenca</h3>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>Av. España y Sebastián de Benalcázar</p>
                        <p class="text-xs text-slate-600"><i class="fa-solid fa-bus mr-1 text-slate-400"></i>Conexión: Tranvía de Cuenca</p>
                        <p class="text-2xs text-slate-500 pt-2 border-t">Destinos principales: Gualaceo, Chordeleg, Paute, Azogues, Guayaquil.</p>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Custom Notification Toast -->
    <div id="toast-notification" class="fixed bottom-5 right-5 bg-slate-800 text-white text-xs px-4 py-3 rounded-xl shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 z-50 flex items-center space-x-2">
        <i class="fa-solid fa-circle-info text-amber-400"></i>
        <span id="toast-message">Notificación</span>
    </div>

    <!-- Application Logic Script -->
    <script>
        // --- GEMINI API SETUP & CONFIGURATION ---
        const apiKey = ""; // Managed by environment
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const SYSTEM_PROMPT = `
Eres "RutaEcuador AI", un chatbot asesor experto en transporte intercantonal e interprovincial en Ecuador.
Tus responsabilidades:
1. Dar información precisa sobre rutas de buses entre cantones ecuatorianos (ej. Quito-Sangolquí, Esmeraldas-Atacames, Guayaquil-Durán, Ambato-Baños, Cuenca-Gualaceo, Ibarra-Otavalo, etc.).
2. Informar sobre cooperativas típicas (Coop. Los Chillos, Del Pacífico, Rutas Milagreñas, Cooperativa Baños, Occidental, Express Sucre, Flota Imbabura, etc.).
3. Explicar las tarifas aproximadas, los descuentos estipulados por ley en Ecuador (50% para adultos mayores de 65 años, estudiantes con carné, niñas/niños y personas con discapacidad).
4. Indicar de qué terminal terrestre o estación salen los buses en cada cantón.
5. Mantén un tono sumamente amable, ágil, estructurado con emojis y listas claras en Markdown.
`;

        // --- SAMPLE DATABASE OF ROUTES ---
        const routesData = [
            { id: 1, origin: 'Quito', destination: 'Sangolqui', origLabel: 'Quito (Marín / Quitumbe)', destLabel: 'Sangolquí / Rumiñahui', coop: 'Coop. Los Chillos / Condor', duration: '40 min', price: 0.85, frequency: 'Cada 10 minutos', type: 'Intercantonal' },
            { id: 2, origin: 'Esmeraldas', destination: 'Atacames', origLabel: 'Esmeraldas (Terrestre Verdeafro)', destLabel: 'Atacames / Tonsupa', coop: 'Coop. Del Pacífico / Trans Esmeraldas', duration: '45 min', price: 1.50, frequency: 'Cada 15 minutos', type: 'Intercantonal' },
            { id: 3, origin: 'Guayaquil', destination: 'Duran', origLabel: 'Guayaquil (Terminal / Malecón)', destLabel: 'Durán (Eloy Alfaro)', coop: 'Coop. Eloy Alfaro / Panorama', duration: '25 min', price: 0.50, frequency: 'Cada 5 minutos', type: 'Intercantonal' },
            { id: 4, origin: 'Ambato', destination: 'Banos', origLabel: 'Ambato (Terminal Ingahurco)', destLabel: 'Baños de Agua Santa', coop: 'Cooperativa Baños / San Francisco', duration: '50 min', price: 1.25, frequency: 'Cada 20 minutos', type: 'Intercantonal' },
            { id: 5, origin: 'Ibarra', destination: 'Otavalo', origLabel: 'Ibarra (Terminal Terrestre)', destLabel: 'Otavalo (Mercado de Ponchos)', coop: 'Coop. Otavalo / Valle del Chota', duration: '30 min', price: 0.75, frequency: 'Cada 10 minutos', type: 'Intercantonal' },
            { id: 6, origin: 'Cuenca', destination: 'Gualaceo', origLabel: 'Cuenca (Terminal Terrestre)', destLabel: 'Gualaceo', coop: 'Coop. Santa / Touris San Francisco', duration: '45 min', price: 1.00, frequency: 'Cada 15 minutos', type: 'Intercantonal' }
        ];

        // Global State for Booking
        let selectedSeat = null;

        // --- TAB SWITCHING ---
        function switchTab(tabName) {
            const tabs = ['chat', 'search', 'booking', 'terminals'];
            tabs.forEach(t => {
                const sec = document.getElementById(`sec-${t}`);
                const btn = document.getElementById(`tab-${t}`);
                if (t === tabName) {
                    sec.classList.remove('hidden');
                    btn.classList.add('bg-brand-800', 'text-white', 'shadow-sm');
                    btn.classList.remove('hover:bg-brand-600', 'text-brand-100');
                } else {
                    sec.classList.add('hidden');
                    btn.classList.remove('bg-brand-800', 'text-white', 'shadow-sm');
                    btn.classList.add('hover:bg-brand-600', 'text-brand-100');
                }
            });
        }

        // --- CHATBOT LOGIC WITH GEMINI API & EXPONENTIAL BACKOFF ---
        async function fetchGeminiResponse(userQuery) {
            const payload = {
                contents: [
                    { parts: [{ text: userQuery }] }
                ],
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                }
            };

            let delay = 1000;
            for (let attempt = 0; attempt < 5; attempt++) {
                try {
                    const response = await fetch(GEMINI_API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) return text;
                    }
                } catch (e) {
                    // Retry silently on error
                }
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff (1s, 2s, 4s, 8s, 16s)
            }

            // Fallback response if API call fails or delay occurs
            return generateLocalFallbackResponse(userQuery);
        }

        function generateLocalFallbackResponse(query) {
            const q = query.toLowerCase();
            if (q.includes('esmeraldas') || q.includes('atacames') || q.includes('tonsupa')) {
                return `🚍 **Ruta Esmeraldas ➔ Atacames / Tonsupa**\n\n- **Cooperativas:** *Coop. Del Pacífico*, *Trans Esmeraldas*.\n- **Punto de Salida:** Terminal Terrestre Verdeafro (Esmeraldas).\n- **Frecuencia:** Salidas cada 15 minutos.\n- **Precio:** ~$1.50 pasaje general ($0.75 tarifa preferencial).\n- **Tiempo de viaje:** 40 a 50 minutos.`;
            } else if (q.includes('quito') || q.includes('sangolqui') || q.includes('chillos')) {
                return `🚌 **Ruta Quito ➔ Sangolquí (Valle de los Chillos)**\n\n- **Cooperativas:** *Coop. Los Chillos*, *Marco Polo*, *Condor*.\n- **Puntos de Salida:** Estación Playón de La Marín o Terminal Quitumbe.\n- **Frecuencia:** Salidas constantes cada 5 a 10 minutos.\n- **Precio:** $0.85 pasaje general.\n- **Tiempo de viaje:** 35 a 50 minutos según tráfico.`;
            } else if (q.includes('descuento') || q.includes('tercera edad') || q.includes('estudiante')) {
                return `🏷️ **Tarifas y Descuentos Preferenciales en Ecuador:**\n\nPor Ley Orgánica de Transporte Terrestre (ANT):\n- **50% de Descuento ($0.50 de tarifa base):**\n  - Adultos mayores (65 años o más).\n  - Niños y estudiantes con uniforme/carné.\n  - Personas con discapacidad (presentando carné CONADIS/MSPR).\n- **Nota:** Aplica para todas las cooperativas intercantonales e interprovinciales.`;
            }
            return `📍 **Información de Rutas Intercantonales**\n\nEcuador cuenta con una amplia red de transporte intercantonal. \n- **Consejo:** Puedes consultar en las ventanillas del Terminal Terrestre de tu localidad.\n- Las salidas suelen operar desde las **05:00 AM hasta las 21:00 PM** en rutas principales.`;
        }

        async function handleChatSubmit(event) {
            event.preventDefault();
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (!message) return;

            // Render User Message
            renderMessage(message, 'user');
            input.value = '';

            // Show typing indicator
            const typing = document.getElementById('chat-typing');
            typing.classList.remove('hidden');

            // Fetch Gemini AI Response
            const replyText = await fetchGeminiResponse(message);

            // Hide typing & Render AI Response
            typing.classList.add('hidden');
            renderMessage(replyText, 'bot');
        }

        function sendQuickPrompt(promptText) {
            document.getElementById('chat-input').value = promptText;
            document.getElementById('chat-form').dispatchEvent(new Event('submit'));
        }

        function renderMessage(text, sender) {
            const container = document.getElementById('chat-messages');
            const wrapper = document.createElement('div');
            wrapper.className = `flex items-start space-x-3 ${sender === 'user' ? 'justify-end' : ''}`;

            if (sender === 'bot') {
                const htmlContent = marked.parse(text);
                wrapper.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-1 shadow-2xs">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-2xs max-w-2xl text-sm leading-relaxed text-slate-700">
                        ${htmlContent}
                    </div>
                `;
            } else {
                wrapper.innerHTML = `
                    <div class="bg-brand-600 text-white p-3.5 rounded-2xl rounded-tr-none shadow-2xs max-w-md text-sm leading-relaxed">
                        ${text}
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs flex-shrink-0 mt-1">
                        <i class="fa-solid fa-user"></i>
                    </div>
                `;
            }

            container.appendChild(wrapper);
            container.scrollTop = container.scrollHeight;
        }

        function clearChat() {
            document.getElementById('chat-messages').innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-1">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs max-w-2xl text-sm leading-relaxed">
                        <p class="font-semibold text-brand-700 mb-1">¡Chat Limpiado!</p>
                        <p class="text-slate-600">¿En qué otro trayecto intercantonal te puedo asesorar?</p>
                    </div>
                </div>
            `;
        }

        // --- ROUTE SEARCH & RENDER LOGIC ---
        function renderRoutes(list) {
            const container = document.getElementById('routes-container');
            container.innerHTML = '';

            if (list.length === 0) {
                container.innerHTML = `
                    <div class="col-span-2 bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-500">
                        <i class="fa-solid fa-bus-slash text-4xl mb-2 text-slate-300"></i>
                        <p>No se encontraron rutas con los filtros seleccionados.</p>
                    </div>
                `;
                return;
            }

            list.forEach(r => {
                const card = document.createElement('div');
                card.className = "bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4";
                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-2xs font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-100">
                                ${r.type}
                            </span>
                            <span class="text-base font-extrabold text-emerald-600">$${r.price.toFixed(2)}</span>
                        </div>
                        <h3 class="font-bold text-slate-800 text-base">${r.origLabel} ➔ ${r.destLabel}</h3>
                        <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-building-flag mr-1 text-slate-400"></i>${r.coop}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                        <div><i class="fa-regular fa-clock text-slate-400 mr-1"></i> <strong>Tiempo:</strong> ${r.duration}</div>
                        <div><i class="fa-solid fa-arrows-rotate text-slate-400 mr-1"></i> <strong>Salidas:</strong> ${r.frequency}</div>
                    </div>

                    <button onclick="quickReserve(${r.id})" class="w-full bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-1">
                        <i class="fa-solid fa-chair"></i> Seleccionar Asiento
                    </button>
                `;
                container.appendChild(card);
            });
        }

        function filterRoutes() {
            const orig = document.getElementById('search-origin').value;
            const dest = document.getElementById('search-destination').value;

            const filtered = routesData.filter(r => {
                const matchOrig = (orig === 'todos') || (r.origin.toLowerCase() === orig.toLowerCase());
                const matchDest = (dest === 'todos') || (r.destination.toLowerCase() === dest.toLowerCase());
                return matchOrig && matchDest;
            });

            renderRoutes(filtered);
        }

        function quickReserve(routeId) {
            switchTab('booking');
            document.getElementById('booking-route-select').value = routeId;
            updateBookingDetails();
        }

        // --- BOOKING & SEAT MAP LOGIC ---
        function renderSeatGrid() {
            const grid = document.getElementById('bus-seat-grid');
            grid.innerHTML = '';
            
            // Occupied dummy seats
            const occupied = [3, 7, 10, 14, 18];

            let seatNum = 1;
            for (let row = 0; row < 7; row++) {
                for (let col = 0; col < 5; col++) {
                    if (col === 2) {
                        // Pasillo central
                        const aisle = document.createElement('div');
                        aisle.className = "w-full h-8";
                        grid.appendChild(aisle);
                    } else {
                        const currentSeat = seatNum;
                        const isOccupied = occupied.includes(currentSeat);
                        const seatBtn = document.createElement('button');
                        
                        let baseStyle = "w-full h-8 rounded-md flex items-center justify-center font-bold transition text-2xs ";
                        if (isOccupied) {
                            baseStyle += "bg-slate-300 text-slate-500 cursor-not-allowed";
                            seatBtn.disabled = true;
                        } else if (selectedSeat === currentSeat) {
                            baseStyle += "bg-brand-600 text-white shadow-sm ring-2 ring-brand-300";
                        } else {
                            baseStyle += "bg-slate-100 hover:bg-brand-100 text-slate-700 border border-slate-300";
                        }

                        seatBtn.className = baseStyle;
                        seatBtn.innerText = currentSeat;
                        seatBtn.onclick = () => selectSeat(currentSeat);
                        grid.appendChild(seatBtn);
                        seatNum++;
                    }
                }
            }
        }

        function selectSeat(num) {
            selectedSeat = num;
            document.getElementById('selected-seat-label').innerText = `Asiento N° ${num}`;
            renderSeatGrid();
            calculateFare();
        }

        function updateBookingDetails() {
            selectedSeat = null;
            document.getElementById('selected-seat-label').innerText = 'Ninguno';
            renderSeatGrid();
            calculateFare();
        }

        function calculateFare() {
            const routeId = parseInt(document.getElementById('booking-route-select').value);
            const discountFactor = parseFloat(document.getElementById('booking-passenger-type').value);
            const route = routesData.find(r => r.id === routeId);

            if (route) {
                const base = route.price;
                const total = base * discountFactor;

                document.getElementById('fare-base').innerText = `$${base.toFixed(2)}`;
                document.getElementById('fare-total').innerText = `$${total.toFixed(2)}`;
            }
        }

        function generateDigitalTicket() {
            if (!selectedSeat) {
                showToast("Por favor selecciona un asiento disponible en el mapa.");
                return;
            }

            const routeId = parseInt(document.getElementById('booking-route-select').value);
            const route = routesData.find(r => r.id === routeId);
            const totalFare = document.getElementById('fare-total').innerText;

            document.getElementById('ticket-coop-name').innerText = route.coop;
            document.getElementById('ticket-route').innerText = `${route.origLabel} ➔ ${route.destLabel}`;
            document.getElementById('ticket-seat').innerText = `N° ${selectedSeat}`;
            document.getElementById('ticket-price').innerText = totalFare;
            
            const now = new Date();
            document.getElementById('ticket-datetime').innerText = now.toLocaleDateString('es-EC') + ' - ' + now.toLocaleTimeString('es-EC', {hour: '2-digit', minute:'2-digit'});

            document.getElementById('ticket-modal').classList.remove('hidden');
        }

        function closeTicketModal() {
            document.getElementById('ticket-modal').classList.add('hidden');
            showToast("¡Boleto generado con éxito! Guarda tu captura.");
        }

        function showToast(msg) {
            const toast = document.getElementById('toast-notification');
            document.getElementById('toast-message').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // --- INIT ON LOAD ---
        window.onload = function() {
            renderRoutes(routesData);
            renderSeatGrid();
            calculateFare();
        };
    </script>
</body>
</html>