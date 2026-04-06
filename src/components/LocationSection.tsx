import { MapPin, Phone } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Location</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Visit Our <span className="text-accent italic font-serif">Studio</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto">We welcome you to experience our design philosophy in person.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact Info Box */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-wide uppercase mb-2">R U Interior Designs</h3>
            <p className="text-accent/80 text-sm mb-10 font-medium">(RAJU)</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <p className="text-white/80 leading-relaxed text-sm">
                  No. 238/1, Balaraju Building<br/>
                  17th, Begur Rd<br/>
                  Near St Francis School, Amalodbhava Nagar<br/>
                  Begur, Bengaluru, Karnataka 560068
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div className="text-white/80 text-sm space-y-1">
                  <p>+91 9581017161</p>
                  <p>+91 8431473987</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden min-h-[400px] border border-white/5">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3792610531!2d77.62534571295982!3d12.880468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14eb919a32c7%3A0xc3f3455b5585b0d6!2sBegur%2C%20Bengaluru%2C%20Karnataka%20560068!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
