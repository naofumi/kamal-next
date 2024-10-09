import {prisma} from "@/app/helpers/prisma_helpers"
import {deleteUsers, getUsers} from "@/app/repositories/user_repository"
import {deletePosts} from "@/app/repositories/post_repository"

export async function seedAll() {
  await deletePosts()
  await deleteUsers()

  await seedUsers()
  await seedPosts1()
  await seedPosts2()
}

export async function seedUsers() {
  await prisma.user.createMany({
    data: [{
      email: "alice@example.com",
      name: "Alice",
    }, {
      email: "bob@example.com",
      name: "Bob",
    }]
  })
}

export async function seedPosts1() {
  const user = (await getUsers())[0]

  await prisma.post.createMany({
    data: [{
      title: "Star Woes",
      content: "Dictumst fermentum vivamus libero pellentesque lobortis nisi vehicula ut donec, sociosqu sollicitudin justo semper sed aliquam cubilia etiam, proin himenaeos morbi gravida diam aenean turpis ad. Eleifend etiam placerat varius inceptos volutpat nisi non nisl lacinia per, aliquet nam pharetra senectus fringilla mi ullamcorper curae. Auctor venenatis per urna nunc est nam semper natoque eros bibendum fermentum, vehicula eleifend et erat felis mollis at integer morbi mi. Senectus lectus pharetra praesent at nullam class mauris aptent venenatis scelerisque ullamcorper porta, gravida integer ut neque ad sodales felis facilisis cubilia pulvinar hendrerit. Himenaeos inceptos interdum integer aenean est vel, lectus primis potenti dictum class. Potenti egestas sociis taciti posuere donec mattis congue cursus morbi natoque molestie, accumsan libero hac euismod cras bibendum metus felis sollicitudin condimentum. Fusce hendrerit iaculis morbi accumsan phasellus vehicula tempor eget placerat primis, quis ante nisi mattis enim sed et habitant.",
      published: true,
      authorId: user.id
    }]
  })
}

export async function seedPosts2() {
  const user = (await getUsers())[1]

  await prisma.post.createMany({
    data: [{
      title: "Superwan",
      content: "Metus platea sem tristique consequat nec class netus dui venenatis, vehicula ad praesent ligula duis curabitur integer felis, vestibulum eleifend hac auctor tortor fusce proin luctus. Ad sed placerat leo montes sapien metus proin, litora blandit vitae gravida penatibus nostra urna sagittis, cursus facilisis cras quisque suscipit tincidunt. Quam vitae litora cum ullamcorper mauris lectus penatibus, hendrerit integer sociosqu vivamus ante felis facilisis, ligula dictumst ultricies mi mattis fermentum. Sem lacus erat eleifend massa nisl sagittis nascetur fringilla torquent sapien malesuada turpis nostra curabitur, pharetra hac lacinia ut orci posuere lectus rhoncus volutpat arcu tellus nullam. Sodales ultricies pulvinar velit tellus rhoncus nunc leo vel montes penatibus gravida ornare, porta torquent augue etiam venenatis enim cubilia hendrerit est eget malesuada, nostra dictumst et praesent himenaeos sapien euismod cum facilisis vivamus phasellus. Aptent nisi leo natoque ante ridiculus rhoncus tristique sociis nec per, velit vestibulum libero curae litora suscipit turpis phasellus integer, nascetur fermentum dictumst feugiat dui vehicula risus mauris sed. Hac orci sollicitudin platea nunc ridiculus accumsan fames suspendisse, libero sem fusce sociosqu posuere vehicula faucibus malesuada, velit vulputate molestie tempus urna semper dictumst. Ultrices iaculis sociis non erat maecenas tempus eros, facilisi urna montes eu parturient aliquam, phasellus mollis at auctor malesuada nulla. Id blandit vulputate hac parturient tincidunt fusce rhoncus, conubia ullamcorper placerat viverra penatibus phasellus consequat, lacus urna diam duis aliquet felis. Ultricies quis velit primis aliquam litora a felis fusce tortor dictumst, scelerisque pretium id sapien mauris habitant mi mus cras lobortis, quam dignissim nunc mollis pellentesque potenti varius ridiculus condimentum. Velit lacinia dignissim semper fermentum congue aptent libero id, varius ultricies dis dapibus proin parturient nostra.",
      published: true,
      authorId: user.id
    }]
  })
}

