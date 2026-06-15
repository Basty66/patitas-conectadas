import pg from 'pg'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '..', '.env') })

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_sgfc06jlaRCO@ep-bitter-unit-atgtkruo-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
})

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('Conectado a PostgreSQL')

    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    // Drop existing tables for clean migration
    await client.query('DROP TABLE IF EXISTS blog_comments CASCADE')
    await client.query('DROP TABLE IF EXISTS blog_posts CASCADE')
    await client.query('DROP TABLE IF EXISTS notifications CASCADE')
    await client.query('DROP TABLE IF EXISTS pets CASCADE')

    // ── pets ──
    await client.query(`
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        type VARCHAR(10) NOT NULL CHECK(type IN ('lost','found')),
        species VARCHAR(50) NOT NULL DEFAULT 'dog',
        name VARCHAR(100),
        breed VARCHAR(100),
        color VARCHAR(100),
        size VARCHAR(10) CHECK(size IN ('small','medium','large')),
        gender VARCHAR(10) CHECK(gender IN ('male','female','unknown')),
        age VARCHAR(50),
        description TEXT,
        contact_name VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(100),
        address TEXT,
        lat DOUBLE PRECISION,
        lng DOUBLE PRECISION,
        photo VARCHAR(500),
        colors TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active','resolved')),
        created_at TIMESTAMP DEFAULT LOCALTIMESTAMP
      )
    `)
    console.log('✓ Tabla pets creada')

    // ── notifications ──
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL CHECK(type IN ('match','info','success')),
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        pet_id INTEGER REFERENCES pets(id),
        match_score INTEGER,
        read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT LOCALTIMESTAMP
      )
    `)
    console.log('✓ Tabla notifications creada')

    // ── blog_posts ──
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100) DEFAULT 'Equipo Patitas',
        type VARCHAR(20) DEFAULT 'article' CHECK(type IN ('article','success_story','tip','announcement')),
        image VARCHAR(500),
        likes INTEGER DEFAULT 0,
        pet_id INTEGER,
        published INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT LOCALTIMESTAMP
      )
    `)
    console.log('✓ Tabla blog_posts creada')

    // ── blog_comments ──
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES blog_posts(id),
        author VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT LOCALTIMESTAMP
      )
    `)
    console.log('✓ Tabla blog_comments creada')

    // ── Seed data: pets ──
    const petCount = await client.query('SELECT COUNT(*) FROM pets')
    if (parseInt(petCount.rows[0].count) === 0) {
      const pets = [
        { type:'lost', species:'dog', name:'Luna', breed:'Labrador', color:'Dorado', size:'large', gender:'female', age:'2 años', description:'Se perdió en el parque Araucano. Tiene collar azul y es muy amistosa.', contact_name:'María González', phone:'+56912345678', email:'maria@email.com', address:'Av. Las Condes 1234', lat:-33.4082, lng:-70.5706, status:'active' },
        { type:'lost', species:'dog', name:'Max', breed:'Pastor Alemán', color:'Negro y marrón', size:'large', gender:'male', age:'4 años', description:'Escapó del jardín en La Florida. Responde a su nombre.', contact_name:'Carlos Muñoz', phone:'+56987654321', email:'carlos@email.com', address:'Av. La Florida 567', lat:-33.5340, lng:-70.5840, status:'active' },
        { type:'found', species:'cat', name:null, breed:'Común europeo', color:'Naranja', size:'medium', gender:'male', age:'~1 año', description:'Encontrado en el centro de Santiago. Muy cariñoso, sin collar.', contact_name:'Centro de Rescate', phone:'+56956789012', email:'rescate@email.com', address:'Santiago Centro', lat:-33.4378, lng:-70.6504, status:'active' },
        { type:'lost', species:'cat', name:'Misi', breed:'Siamés', color:'Café claro', size:'small', gender:'female', age:'3 años', description:'Se escapó por la ventana en Providencia. Tiene un lunar en la oreja izquierda.', contact_name:'Ana Soto', phone:'+56934567890', email:'ana@email.com', address:'Providencia 2345', lat:-33.4219, lng:-70.6077, status:'active' },
        { type:'found', species:'dog', name:null, breed:'Mestizo', color:'Blanco con manchas', size:'medium', gender:'male', age:'~2 años', description:'Encontrado en el cerro San Cristóbal. Muy delgado pero amigable.', contact_name:'Carabineros', phone:'+56923456789', email:null, address:'Cerro San Cristóbal', lat:-33.4288, lng:-70.6337, status:'active' },
        { type:'lost', species:'dog', name:'Toby', breed:'Beagle', color:'Marrón y blanco', size:'medium', gender:'male', age:'1 año', description:'Perdido en Ñuñoa. Encontrado gracias a la plataforma.', contact_name:'Familia Pérez', phone:'+56945678901', email:null, address:'Ñuñoa 890', lat:-33.4567, lng:-70.6023, status:'resolved' },
      ]

      for (const p of pets) {
        await client.query(
          `INSERT INTO pets (type,species,name,breed,color,size,gender,age,description,contact_name,phone,email,address,lat,lng,status,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,LOCALTIMESTAMP - interval '${Math.floor(Math.random()*30)} days')`,
          [p.type, p.species, p.name, p.breed, p.color, p.size, p.gender, p.age, p.description, p.contact_name, p.phone, p.email, p.address, p.lat, p.lng, p.status]
        )
        console.log(`  ✓ Pet: ${p.name || 'sin nombre'} (${p.type})`)
      }
    } else {
      console.log('  pets ya tiene datos, saltando seed')
    }

    // ── Seed data: blog_posts ──
    const postCount = await client.query('SELECT COUNT(*) FROM blog_posts')
    if (parseInt(postCount.rows[0].count) === 0) {
      const posts = [
        { title:'¿Qué hacer si pierdes a tu mascota?', content:'## Pasos a seguir\n\n1. **Mantén la calma** y revisa bien tu casa y alrededores.\n2. **Publica en Patitas Conectadas** cuanto antes.\n3. **Comparte en redes sociales** con fotos recientes.\n4. **Visita veterinarios y refugios** cercanos.\n5. **No pierdas la esperanza** — muchas mascotas se reencuentran.\n\nNuestra plataforma te ayuda a encontrar coincidencias automáticamente con mascotas encontradas en tu zona.', author:'Equipo Patitas', type:'article', published:1 },
        { title:'Luna volvió a casa — Historia de éxito', content:'## Una historia que nos llena de alegría\n\nMaría perdió a su perrita Luna en el Parque Araucano. Gracias a la alerta que generó en Patitas Conectadas y a un vecino que la reconoció por las fotos, Luna regresó a casa después de 3 días.\n\n"La plataforma nos dio esperanza y herramientas concretas para buscar. Recomiendo a todos los dueños responsables que la usen", nos cuenta María.', author:'Equipo Patitas', type:'success_story', published:1 },
        { title:'Consejos para el cuidado de mascotas en invierno', content:'## Cuida a tu compañero en los días fríos\n\n- **Abrígalo**: especialmente perros de pelo corto o avanzada edad.\n- **Revisa sus patas**: la humedad puede causar hongos.\n- **Alimentación**: aumentar ligeramente las porciones ayuda a mantener temperatura.\n- **Paseos**: evitar horas de mayor frío (muy temprano o noche).\n- **Cama**: que esté elevada del suelo y en lugar seco y cálido.', author:'Veterinaria Amiga', type:'tip', published:1 },
        { title:'Nueva alianza con municipalidades de la RM', content:'## Patitas Conectadas firma convenio con 5 municipios\n\nSantiago, Providencia, Ñuñoa, La Florida y Las Condes se suman a nuestra red de municipios conectados. Esto permite que los reportes de mascotas perdidas se integren directamente con los sistemas municipales de registro.\n\nLos vecinos de estas comunas pueden ahora reportar desde la app y la información llegará automáticamente a las direcciones de aseo y ornato correspondientes.', author:'Equipo Patitas', type:'announcement', published:1 },
      ]

      for (const p of posts) {
        await client.query(
          `INSERT INTO blog_posts (title,content,author,type,published,created_at) VALUES ($1,$2,$3,$4,$5,LOCALTIMESTAMP - interval '${Math.floor(Math.random()*15+1)} days')`,
          [p.title, p.content, p.author, p.type, p.published]
        )
        console.log(`  ✓ Post: ${p.title.substring(0,40)}...`)
      }
    } else {
      console.log('  blog_posts ya tiene datos, saltando seed')
    }

    // ── Seed data: blog_comments ──
    const commentCount = await client.query('SELECT COUNT(*) FROM blog_comments')
    if (parseInt(commentCount.rows[0].count) === 0) {
      const postIds = await client.query('SELECT id FROM blog_posts')
      if (postIds.rows.length > 0) {
        const comments = [
          { post_id:postIds.rows[0].id, author:'Usuario123', content:'Muy útil, gracias por la información. Lamentablemente perdí a mi gato ayer y estos pasos me ayudaron mucho.' },
          { post_id:postIds.rows[0].id, author:'María González', content:'Gracias a esta guía pude encontrar a Luna. ¡Funciona!' },
        ]
        if (postIds.rows.length > 1) {
          comments.push({ post_id:postIds.rows[1].id, author:'Carlos Muñoz', content:'Qué linda historia, me da esperanza de encontrar a mi Max.' })
        }
        if (postIds.rows.length > 2) {
          comments.push({ post_id:postIds.rows[2].id, author:'Vet. Claudia', content:'Excelentes consejos. Como veterinaria, recomiendo especialmente lo de las patas en invierno.' })
        }
        for (const c of comments) {
          await client.query('INSERT INTO blog_comments (post_id,author,content) VALUES ($1,$2,$3)', [c.post_id, c.author, c.content])
        }
        console.log(`  ✓ ${comments.length} comentarios insertados`)
      }
    }

    // ── Seed data: notifications ──
    const notifCount = await client.query('SELECT COUNT(*) FROM notifications')
    if (parseInt(notifCount.rows[0].count) === 0) {
      const notifs = [
        { type:'match', title:'Posible coincidencia encontrada', message:'Max (Pastor Alemán) tiene un 85% de coincidencia con una mascota encontrada en La Florida.', pet_id:2, match_score:85 },
        { type:'match', title:'Nueva mascota reportada en tu zona', message:'Se reportó un gato naranja en Santiago Centro que coincide con la descripción de Misi.', pet_id:4, match_score:62 },
        { type:'info', title:'Bienvenido a Patitas Conectadas', message:'Gracias por unirte a nuestra comunidad. Publica tu primer reporte para empezar.', pet_id:null, match_score:null },
        { type:'success', title:'Toby fue encontrado', message:'Toby el Beagle regresó a casa gracias a un aviso en la plataforma. ¡Felicitaciones!', pet_id:null, match_score:null },
      ]
      for (const n of notifs) {
        await client.query(
          'INSERT INTO notifications (type,title,message,pet_id,match_score) VALUES ($1,$2,$3,$4,$5)',
          [n.type, n.title, n.message, n.pet_id, n.match_score]
        )
      }
      console.log('  ✓ Notificaciones insertadas')
    }

    console.log('\n Migración completada exitosamente')
  } catch (e) {
    console.error('Error en migración:', e)
    throw e
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
