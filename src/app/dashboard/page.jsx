'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { getWarehouses, createWarehouse } from '@/lib/db/warehouses'
import { deleteWarehouse } from '@/lib/db/warehouses'
import { updateWarehouse } from '@/lib/db/warehouses'


export default function Dashboard() {
  const router = useRouter()
  const [warehouses, setWarehouses] = useState([])
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editLocation, setEditLocation] = useState('')

  const loadWarehouses = async () => {
    const data = await getWarehouses()
    setWarehouses(data || [])
  }

  useEffect(() => {
    loadWarehouses()
  }, [])

  const handleAdd = async () => {
    if (!name) return
    await createWarehouse(name, location)
    setName('')
    setLocation('')
    loadWarehouses()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleDelete = async (id) => {
  await deleteWarehouse(id)
  loadWarehouses()
  }

  const startEdit = (warehouse) => {
  setEditingId(warehouse.id)
  setEditName(warehouse.name)
  setEditLocation(warehouse.location)
  }

  const handleUpdate = async () => {
  await updateWarehouse(editingId, editName, editLocation)
  setEditingId(null)
  setEditName('')
  setEditLocation('')
  loadWarehouses()
  }

  return (
  <div style={{ padding: 20 }}>
    <h1>Dashboard</h1>

    <button onClick={handleLogout}>Logout</button>

    <hr />

    <h2>Добавить склад</h2>
    <input
      placeholder="Название"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      placeholder="Локация"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button onClick={handleAdd}>Добавить</button>

    <hr />

    <h2>Список складов</h2>

    {warehouses.map((w) => (
      <div key={w.id} style={{ marginBottom: 15 }}>
        {editingId === w.id ? (
          <>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
            />
            <button onClick={handleUpdate}>Сохранить</button>
            <button onClick={() => setEditingId(null)}>Отмена</button>
          </>
        ) : (
          <>
            <strong>{w.name}</strong> — {w.location}
            <button
              onClick={() => startEdit(w)}
              style={{ marginLeft: 10 }}
            >
              Редактировать
            </button>
            <button
              onClick={() => handleDelete(w.id)}
              style={{ marginLeft: 10 }}
            >
              Удалить
            </button>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => router.push(`/dashboard/${w.id}`)}
            >
              Перейти
            </button>
            
          </>
        )}
      </div>
    ))}
  </div>
)
}