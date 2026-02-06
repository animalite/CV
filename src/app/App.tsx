import { Mail, Phone, Linkedin, Download, Github } from 'lucide-react';

export default function App() {


  return (
    <div className="min-h-screen bg-white p-8 md:p-12">
      {/* Download Button */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <a
          href="/Lebenslauf_Joaquin_Pozo_Reyes.pdf"
          download
          className="flex items-center gap-2 bg-[#D44646] text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-['Montserrat'] font-bold"
        >
          <Download size={20} />
          <span>PDF speichern</span>
        </a>
      </div>

      <div className="max-w-[210mm] mx-auto bg-white">
        {/* Header */}
        <header className="border-8 border-black bg-white p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
          <div>
            <h1 className="font-['Montserrat'] font-black text-5xl md:text-5xl mb-2 leading-none break-words">
                          JOAQUIN POZO REYES
                        </h1>
            <div className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#D44646] mb-4">
              FULL-STACK ENTWICKLER
            </div>
            <div className="text-lg font-medium">Leipzig, Deutschland</div>
          </div>

          {/* Contact */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-black text-white px-4 py-2">
              <Mail size={18} />
              <a href="mailto:dev@animalite.org" className="font-medium text-inherit hover:text-[#D44646] transition-colors">dev@animalite.org</a>
            </div>
            <div className="flex items-center gap-2 bg-black text-white px-4 py-2">
              <Phone size={18} />
              <a href="#" className="font-medium text-inherit hover:text-[#D44646] transition-colors">Please ask</a>
            </div>
            <div className="flex items-center gap-2 border-4 border-black px-4 py-2">
              <Linkedin size={18} />
              <a href="https://www.linkedin.com/in/joaquinpozo/" target="_blank" rel="noopener noreferrer" className="font-medium text-inherit hover:text-[#D44646] transition-colors">linkedin.com/in/joaquinpozo</a>
            </div>
            <div className="flex items-center gap-2 border-4 border-black px-4 py-2">
              <Github size={18} />
              <a href="https://github.com/animalite" target="_blank" rel="noopener noreferrer" className="font-medium text-inherit hover:text-[#D44646] transition-colors">github.com/animalite</a>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="md:col-span-2 space-y-8">
            {/* Ausbildung */}
            <section>
              <div className="bg-black text-white px-6 py-3 mb-4 border-4 border-black">
                <h2 className="font-['Montserrat'] font-black text-3xl break-words">AUSBILDUNG</h2>
              </div>

              <div className="space-y-6">
                {/* 42 Silicon Valley */}
                <div className="border-l-8 border-black pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D44646] border-4 border-black"></div>
                  <h3 className="font-['Montserrat'] font-bold text-xl break-words">42 Silicon Valley</h3>
                  <div className="text-sm text-gray-600 mb-3">Intensivkurs C-Programmierung | 2019</div>
                  <ul className="space-y-1 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Fundamentale Systemprogrammierung: Speicherverwaltung, Algorithmen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Peer-to-Peer Lernmethode mit täglichen Code-Challenges</span>
                    </li>
                  </ul>
                </div>

                {/* Universidad de Chile */}
                <div className="border-l-8 border-black pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D44646] border-4 border-black"></div>
                  <h3 className="font-['Montserrat'] font-bold text-xl break-words">Universidad de Chile</h3>
                  <div className="text-sm text-gray-600 mb-3">Wirtschaftsingenieurwesen | 2018–2019</div>
                  <ul className="space-y-1 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Finanzanalyse, Höhere Mathematik, Systemanalyse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Analytische Methoden für Geschäftsentscheidungen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Berufserfahrung */}
            <section>
              <div className="bg-black text-white px-6 py-3 mb-4 border-4 border-black">
                <h2 className="font-['Montserrat'] font-black text-3xl break-words">BERUFSERFAHRUNG</h2>
              </div>

              <div className="space-y-6">
                {/* E-commerce Project */}
                <div className="border-l-8 border-black pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D44646] border-4 border-black"></div>
                  <h3 className="font-['Montserrat'] font-bold text-xl break-words">E-Commerce Optimierung</h3>
                  <div className="text-sm text-gray-600 mb-3">Projektauftrag | 01/2026</div>
                  <ul className="space-y-1 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Komplettrelaunch in 48h – 400% Performance-Steigerung (4,2s → 0,8s)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Infrastruktur: Docker, Nginx, Redis-Caching, Cloudflare CDN</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Payment-Integration (Flow, PayPal) und internationale Versandlogistik</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Analytics mit Matomo und Custom Dashboards</span>
                    </li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-black text-white px-3 py-1 text-sm">WordPress</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Docker</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Redis</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Cloudflare</span>
                  </div>
                </div>

                {/* Tempeh Factory */}
                <div className="border-l-8 border-black pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D44646] border-4 border-black"></div>
                  <h3 className="font-['Montserrat'] font-bold text-xl break-words">Produktionsmitarbeiter</h3>
                  <div className="text-sm text-gray-600 mb-3">Tempeh-Herstellung | Leipzig | 11/2024–heute</div>
                  <ul className="space-y-1 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Vollständige Prozessverantwortung: Fermentation bis Verpackung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Qualitätskontrolle und Prozessdokumentation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Aktuelle Entwicklung */}
            <section>
              <div className="bg-black text-white px-6 py-3 mb-4 border-4 border-black">
                <h2 className="font-['Montserrat'] font-black text-3xl break-words">AKTUELLE ENTWICKLUNG</h2>
              </div>

              <div className="space-y-6">
                {/* Django Projekt */}
                <div className="border-4 border-black p-5">
                  <h3 className="font-['Montserrat'] font-bold text-xl mb-2"><a href="https://comuniza.org/" className="text-inherit no-underline hover:text-[#D44646] transition-colors">comuniza.org — Netzwerk + Marketplace</a></h3>
                  <div className="text-sm text-gray-600 mb-3">Django P2P Leihplattform | Seit 12/2025</div>
                  <ul className="space-y-1 list-none mb-3">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>E2EE-Messaging mit AES-256 Verschlüsselung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Redis-Caching, Celery für asynchrone Tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>REST API mit Django REST Framework und Unit Tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Deployment mit Docker und CI/CD-Grundlagen</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-black text-white px-3 py-1 text-sm">Django</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">PostgreSQL</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Redis</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Docker</span>
                  </div>
                </div>

                {/* Nachhaltige Infrastruktur */}
                <div className="border-4 border-black p-5">
                  <h3 className="font-['Montserrat'] font-bold text-xl mb-2 break-words">Nachhaltige Infrastruktur</h3>
                  <div className="text-sm text-gray-600 mb-3">Persönliches Projekt | Seit 2024</div>
                  <ul className="space-y-1 list-none mb-3">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Self-Hosting: Nextcloud, Mailcow auf eigenem VPS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Statische Websites mit Pelican/Hugo – Fokus auf Performance und Ressourceneffizienz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D44646] font-bold mt-1">▸</span>
                      <span>Linux Server-Administration, Docker, automatisierte Backups</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-black text-white px-3 py-1 text-sm">Linux</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Docker</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Nginx</span>
                    <span className="bg-black text-white px-3 py-1 text-sm">Pelican</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Fähigkeiten */}
            <section>
              <div className="bg-[#D44646] text-white px-4 py-3 mb-4 border-4 border-black">
                <h2 className="font-['Montserrat'] font-black text-2xl break-words">FÄHIGKEITEN</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-['Montserrat'] font-bold text-sm mb-2">BACKEND</div>
                  <div className="text-sm space-y-1">
                    <div>Django / Python</div>
                    <div>PostgreSQL / MariaDB</div>
                    <div>Redis / Celery</div>
                    <div>REST APIs</div>
                  </div>
                </div>

                <div>
                  <div className="font-['Montserrat'] font-bold text-sm mb-2">WEB & E-COMMERCE</div>
                  <div className="text-sm space-y-1">
                    <div>HTML / CSS / JavaScript</div>
                    <div>WordPress / WooCommerce</div>
                    <div>Payment Gateway Integration</div>
                  </div>
                </div>

                <div>
                  <div className="font-['Montserrat'] font-bold text-sm mb-2">INFRASTRUKTUR</div>
                  <div className="text-sm space-y-1">
                    <div>Docker / Docker Compose</div>
                    <div>Nginx / Linux Server</div>
                    <div>Git / CI/CD Grundlagen</div>
                    <div>Cloudflare / CDN</div>
                  </div>
                </div>

                <div>
                  <div className="font-['Montserrat'] font-bold text-sm mb-2">ANALYTIK & SICHERHEIT</div>
                  <div className="text-sm space-y-1">
                    <div>Matomo Analytics</div>
                    <div>Prometheus / Grafana</div>
                    <div>DSGVO-Compliance</div>
                    <div>Performance-Monitoring</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sprachen */}
            <section>
              <div className="bg-[#D44646] text-white px-4 py-3 mb-4 border-4 border-black">
                <h2 className="font-['Montserrat'] font-black text-2xl break-words">SPRACHEN</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Spanisch</span>
                  <span className="font-['Montserrat'] font-bold">Muttersprache</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Deutsch</span>
                  <span className="font-['Montserrat'] font-bold">Fließend (C1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Englisch</span>
                  <span className="font-['Montserrat'] font-bold">Fließend</span>
                </div>
              </div>
            </section>

            {/* Ergebnisse */}
            <div className="bg-[#D44646] text-white p-5 border-4 border-black">
              <h3 className="font-['Montserrat'] font-black text-lg mb-3 break-words">PRAKTISCHE ERGEBNISSE</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-['Montserrat'] font-black text-2xl">400%</div>
                  <div>Performance-Steigerung</div>
                </div>
                <div>
                  <div className="font-['Montserrat'] font-black text-2xl">48h</div>
                  <div>Komplettrelaunch</div>
                </div>
                <div>
                  <div className="font-['Montserrat'] font-black text-2xl">98+</div>
                  <div>PageSpeed Score</div>
                </div>
              </div>
            </div>

            {/* Prinzipien */}
            <div className="bg-[#D44646] text-white p-5 border-4 border-black">
              <h3 className="font-['Montserrat'] font-bold text-sm mb-2 break-words">PRINZIPIEN</h3>
              <div className="text-xs space-y-1">
                <div>• Web-Entwicklung seit Jugendalter (erste Projekte 2013)</div>
                <div>• Nachhaltige Architekturen (ressourceneffizient, wartbar)</div>
                <div>• Performance durch Vereinfachung</div>
                <div>• DSGVO-konforme Datenschutzlösungen</div>
                <div>• Automatisierung und Self-Hosting wo sinnvoll</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
