'use client'

export default function WhatsAppButton({ whatsapp }: { whatsapp?: string }) {
  const number = (whatsapp || '+919911991330').replace(/\D/g, '')
  const message = encodeURIComponent('Hello! I need help with a legal/compliance service.')
  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#1ebe5d] transition-all hover:scale-105 group"
    >
      {/* Official WhatsApp SVG */}
      <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.437-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.486-.29-5.01 1.194 1.234-4.874-.317-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.325s1.427 3.857 1.626 4.123c.199.265 2.808 4.287 6.803 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.766-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.891-.099-.166-.365-.265-.763-.464z"/>
      </svg>
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}
