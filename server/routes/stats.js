import { Router } from 'express'

const router = Router()

const stats = {
  van: 305902076,
  tir: 178.2,
  pri: 20.1,
  inversion: 56240000,
  prestamo: 50000000,
  capitalPropio: 6240000,
  puntoEquilibrio: 12,
  flujoAcumulado: 414163379,
  cuotaMensual: 1660715,
  totalIntereses: 9785763,
  tasaDescuento: 12,
  horizonte: 36,
  ingresosMes36: 50520000,
  costosOperacionBase: 6330000,
  modalidad: 'Opción 1 - Desarrollo Incremental Ágil (MVP)',
  usuariosMes36: 108000,
  conveniosClinicas: 75,
  conveniosMunicipios: 29,
  conveniosRefugios: 32,
  rrhhDesarrollo: [
    { rol: 'Product Owner', cantidad: 1, horasMes: 120, valorHora: 18000, totalMes: 2160000 },
    { rol: 'Desarrollador Backend', cantidad: 1, horasMes: 160, valorHora: 14000, totalMes: 2240000 },
    { rol: 'Desarrollador Mobile+Front', cantidad: 1, horasMes: 160, valorHora: 14000, totalMes: 2240000 },
    { rol: 'Diseñador UX/UI', cantidad: 1, horasMes: 60, valorHora: 12000, totalMes: 720000 },
    { rol: 'QA Tester', cantidad: 1, horasMes: 40, valorHora: 10000, totalMes: 400000 },
  ],
  rrhhOperacion: [
    { rol: 'PM / Producto', cantidad: 1, horasMes: 80, valorHora: 18000, totalMes: 1440000 },
    { rol: 'Desarrollador Full Stack', cantidad: 1, horasMes: 100, valorHora: 14000, totalMes: 1400000 },
    { rol: 'Soporte Usuarios', cantidad: 2, horasMes: 200, valorHora: 8000, totalMes: 1600000 },
    { rol: 'Community Manager', cantidad: 1, horasMes: 80, valorHora: 10000, totalMes: 800000 },
  ],
  flujoMensual: [
    { mes: 0, ingresos: 0, costos: 0, inversion: 6200000, flujoNeto: -6200000, acumulado: -6200000 },
    { mes: 1, ingresos: 0, costos: 8340000, inversion: 0, flujoNeto: -8340000, acumulado: -14540000 },
    { mes: 6, ingresos: 0, costos: 8340000, inversion: 0, flujoNeto: -8340000, acumulado: -59063554 },
    { mes: 7, ingresos: 560000, costos: 6345192, inversion: 0, flujoNeto: -6213275, acumulado: -65277339 },
    { mes: 12, ingresos: 8280000, costos: 6993917, inversion: 0, flujoNeto: 1886083, acumulado: -45922314 },
    { mes: 21, ingresos: 32320000, costos: 13857310, inversion: 0, flujoNeto: 18198268, acumulado: 17210825 },
    { mes: 36, ingresos: 50520000, costos: 18931023, inversion: 0, flujoNeto: 31591978, acumulado: 414163379 },
  ],
}

router.get('/', (req, res) => {
  res.json(stats)
})

router.get('/pets', (req, res) => {
  const petStats = {
    total: 0, lost: 0, found: 0, resolved: 0,
  }
  res.json(petStats)
})

export default router
