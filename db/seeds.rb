# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Institution.create([{name: 'Universidad XYZ', insti_type: 'University'},
#     {name: 'Escuela ABC', insti_type: 'School'}])

#   Course.create(name: "curso de ingles", description: "introduccion al idioma con un curso de nivel A1",
#   registration_day: Time.now, requirement: "ninguno", favorite: false, institutions_id: 1)

# Course.create([{
#   name: 'Curso de Matemáticas',
#   description: 'Introducción a los conceptos básicos de matemáticas.',
#   registration_day: Time.now,
#   requirement: 'Ninguno',
#   favorite: true,
#   institution_id: 1
# },
# {
#   name: 'Curso de Programación en Ruby',
#   description: 'Aprende a programar en Ruby desde cero.',
#   registration_day: Time.now,
#   requirement: 'Conocimientos básicos de programación',
#   favorite: false,
#   institution_id: 2},
# {  
#     name: 'Curso de Historia del Arte',
#     description: 'Exploración de diferentes períodos artísticos a lo largo de la historia.',
#     registration_day: Time.now,
#     requirement: 'Ninguno',
#     favorite: true,
#     institution_id: 1
# }])

Course.create([
  {
    name: 'Curso de Física Cuántica',
    description: 'Descubre los principios fundamentales de la física cuántica.',
    registration_day: Time.now,
    requirement: 'Conocimientos avanzados de física',
    favorite: false,
    institution_id: 1
  },
  {
    name: 'Curso de Desarrollo Web con React',
    description: 'Aprende a construir aplicaciones web modernas con React.',
    registration_day: Time.now,
    requirement: 'Conocimientos previos de HTML, CSS y JavaScript',
    favorite: true,
    institution_id: 1
  },
  {
    name: 'Curso de Psicología Positiva',
    description: 'Explora los principios de la psicología positiva y su impacto en la salud mental.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: true,
    institution_id: 2
  },
  {
    name: 'Curso de Fotografía Digital',
    description: 'Dominio de la fotografía digital desde los conceptos básicos hasta técnicas avanzadas.',
    registration_day: Time.now,
    requirement: 'Cámara digital',
    favorite: false,
    institution_id: 2
  },
  {
    name: 'Curso de Inteligencia Artificial',
    description: 'Introducción a la inteligencia artificial y sus aplicaciones prácticas.',
    registration_day: Time.now,
    requirement: 'Conocimientos básicos de programación',
    favorite: true,
    institution_id: 1
  },
  {
    name: 'Curso de Literatura Clásica',
    description: 'Exploración de obras literarias clásicas de diferentes períodos y culturas.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: false,
    institution_id: 1
  },
  {
    name: 'Curso de Diseño de Interiores',
    description: 'Principios y técnicas de diseño de interiores para crear espacios funcionales y estéticos.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: true,
    institution_id: 1
  },
  {
    name: 'Curso de Marketing Digital',
    description: 'Estrategias y herramientas para el marketing digital en la era digital.',
    registration_day: Time.now,
    requirement: 'Conocimientos básicos de marketing',
    favorite: false,
    institution_id: 1
  },
  {
    name: 'Curso de Astronomía',
    description: 'Viaje a través del cosmos y explora los misterios del universo.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: true,
    institution_id: 1
  },
  {
    name: 'Curso de Cocina Internacional',
    description: 'Aprende a cocinar platos auténticos de diferentes culturas culinarias.',
    registration_day: Time.now,
    requirement: 'Pasión por la cocina',
    favorite: false,
    institution_id: 2
  },
  {
    name: 'Curso de Desarrollo Personal',
    description: 'Descubre herramientas y prácticas para el desarrollo personal y el crecimiento interior.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: true,
    institution_id: 3
  },
  {
    name: 'Curso de Ecología',
    description: 'Exploración de los principios fundamentales de la ecología y la sostenibilidad.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: false,
    institution_id: 1
  },
  {
    name: 'Curso de Inglés Avanzado',
    description: 'Perfecciona tus habilidades en inglés con un enfoque en la conversación avanzada.',
    registration_day: Time.now,
    requirement: 'Conocimientos intermedios de inglés',
    favorite: true,
    institution_id: 1
  },
  {
    name: 'Curso de Yoga y Meditación',
    description: 'Prácticas de yoga y meditación para la salud física y mental.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: false,
    institution_id: 2
  },
  {
    name: 'Curso de Desarrollo Sostenible',
    description: 'Exploración de los conceptos y prácticas del desarrollo sostenible en el mundo moderno.',
    registration_day: Time.now,
    requirement: 'Ninguno',
    favorite: true,
    institution_id: 2
  },
  {
    name: 'Curso de Robótica',
    description: 'Introducción al diseño y construcción de robots.',
    registration_day: Time.now,
    requirement: 'Conocimientos básicos de programación',
    favorite: false,
    institution_id: 1
  }
])


# Address.create([
# {
#     province: 'Puntarenas',
#     canton: 'Puntarenas',
#     district: 'Puntarenas',
#     neighborhood: 'El Puerto'
# },
# {
#     province: 'Puntarenas',
#     canton: 'Quepos',
#     district: 'Manuel Antonio',
#     neighborhood: 'Playa Espadilla'
# },
# {
#     province: 'Heredia',
#     canton: 'Heredia',
#     district: 'Heredia',
#     neighborhood: 'Centro'
# },
# {
#     province: 'Alajuela',
#     canton: 'Alajuela',
#     district: 'San Rafael',
#     neighborhood: 'El Coyol'
# },
# {
#     province: 'Puntarenas',
#     canton: 'Garabito',
#     district: 'Jaco',
#     neighborhood: 'Playa Hermosa'
# },
# {
#     province: 'Puntarenas',
#     canton: 'Esparza',
#     district: 'Esparza',
#     neighborhood: 'Barrio Nuevo'
# }])

# Category.create(name: 'Programación')
# Category.create(name: 'Diseño')
# Category.create(name: 'Marketing')

# CategoryCourse.create(course: 1, category: 2)
# CategoryCourse.create(course: 1, category: 3)
# CategoryCourse.create(course: 2, category: 1)
# CategoryCourse.create(course: 2, category: 2)

# Branch.create(address_id: 1, course_id: 1, name: 'Rodrigo facio')
# Branch.create(address_id: 4, course_id: 2, name: 'Santa Lucia')
# Branch.create(address_id: 3, course_id: 3, name: 'Ocidene')
# Branch.create(address_id: 1, course_id: 4, name: 'Tobias Vargas')
