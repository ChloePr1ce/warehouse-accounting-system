'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function WarehousePage() {
  const { warehouseId } = useParams()
  const [warehouse, setWarehouse] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchWarehouse = async () => {
      // Получаем данные склада
      const { data: wData, error: wError } = await supabase
        .from('warehouses')
        .select('*')
        .eq('id', warehouseId)
        .single()

      if (wError) console.error(wError)
      else setWarehouse(wData)

      // Получаем товары склада
      const { data: pData, error: pError } = await supabase
        .from('products')
        .select('*')
        .eq('warehouse_id', warehouseId)

      if (pError) console.error(pError)
      else setProducts(pData)
    }

    fetchWarehouse()
  }, [warehouseId])

  if (!warehouse) return <div>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>{warehouse.name} — {warehouse.location}</h1>
      <h2>Товары на складе</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} — {p.quantity} шт.
        </div>
      ))}
    </div>
  )
}