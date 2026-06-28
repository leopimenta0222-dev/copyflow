// Resolve o nome do ícone guardado em contentTypes para o componente do lucide.
import { Package, AtSign, Megaphone, Mail, Type, User, Sparkles } from 'lucide-react'

const MAP = { Package, AtSign, Megaphone, Mail, Type, User }

export const typeIcon = (name) => MAP[name] || Sparkles
