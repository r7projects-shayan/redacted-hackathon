import { FC } from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

interface SocialLink {
  icon: typeof Mail | typeof Github | typeof Twitter;
  href: string;
  label: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const Footer: FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const Lisence: FooterLink[] = [
    
    { label: 'Features', href: '#' },
    { label: 'why we are better', href: '#' },
    {label:'Home',href: '#'},
    {label:'Team', href:'#'}
  ];

  const supportLinks: FooterLink[] = [
    { label: 'FAQ', href: '#' },
    { label: 'Support Center', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
              </div>
              <span className="text-xl font-semibold">ColabCube</span>
            </div>
            <p className="text-sm">Building amazing experiences for our users since 2024.</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  className="hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4"><a>Lisence</a></h3>
            <ul className="space-y-2">
              {Lisence.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates and news.</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">© 2024 ColabCube. All rights reserved.</p>
          <p className="text-sm mt-2 sm:mt-0">
            Licensed under the{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              MIT License
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




