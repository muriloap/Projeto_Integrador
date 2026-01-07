// app/home/assinaturas/sucesso/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Sucesso() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      router.push('/home')
    }, 8000)

    return () => clearTimeout(t)
  }, [router])

  return (
    <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <h1>🎉 Obrigado por assinar o plano Premium!</h1>
      <p>Você será redirecionado para a página inicial em alguns segundos…</p>
    </div>
  )
}
