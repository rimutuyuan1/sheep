import Image from 'next/image'
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns'
import style from './hero.module.css'
import { allPosts, allPhotos } from 'contentlayer/generated'

export const metadata = {
  'title': '按下瞬间 - Tripper Press',
  'og:title': '按下瞬间 - Tripper Press',
  'og:image': 'https://tripper.press/api/og?title=按下瞬间&subtitle=衔枝筑巢，栽花种树。生活沉闷，前行有风。',
}

async function fetchBlogData() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)
  const album = allPhotos
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 8)
  return { posts, album }
}

export default async function Home() {
  const { posts, album } = await fetchBlogData()
  return (
    <main className='bg-white dark:bg-zinc-900'>
      <div className='container px-6 lg:px-8 max-w-[1280px] pt-16 md:pt-20 lg:pt-36 pb-6'>
        <div className="inline-block text-3xl lg:text-5xl font-bold dark:text-white pt-12 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9DCBEE] to-main ">Tripper press</div>
        <div className="md:text-lg lg:text-lg text-sub dark:text-white pb-4">Cherish the romantic universe and daily life.</div>

      </div>
      <div className='container lg:px-8 max-w-[1280px]'>
        <div className={`${style['postHeader']} px-6 lg:px-0 pt-8 pb-4`}>
          <div className="left inline">
            <div className="text-2xl font-bold dark:text-white">Essays</div>
          </div>
          <div className="right inline">
            <Link className='text-main' href="/posts/1">All Essays</Link>
          </div>
        </div>
        <hr />
        <div className='py-6 grid grid-cols-1 md:grid-cols-2 px-4 gap-6 lg:grid-cols-3 lg:px-0'>
          {posts && posts.map((post) => (
            <div key={post.url}>
              <Link href={`/post/${post.url}`} >
                <div className={`${style['postEntry']}`}>
                  <div className={`${style['postEntryCover']} h-[200px]`}>{post.cover ? (
                    <Image src={post.cover} width={300} height={200} alt={post.title}
                      className={`${style['postEntryCover']} object-cover h-full w-full`}
                    />
                  ) : (
                    <Image src={'https://tripper.press/api/og?title=' + post.title} width={300} height={200} alt={post.title} unoptimized
                      className={`${style['postEntryCover']} object-cover h-full w-full`}
                    />
                  )}
                  </div>
                  <div className={`${style['postEntryInfo']} h-[100px] py-4`}>
                    <div className={`${style['postEntryTitle']} text-xl font-medium dark:text-white`}>{post.title}</div>
                    <div className='opacity-60 py-1 text-sm dark:text-zinc-400'>{format(parseISO(post.date), 'yyyy-MM-dd')}
                      {post.category && (
                        ' · ' + post.category
                      )}
                    </div>
                    <div className={`${style['postEntryExcerpt']} opacity-60 text-sm hidden md:block dark:text-zinc-100`}>{post.excerpt}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))
          }
        </div>
        <div className={`${style['postHeader']} px-6 lg:px-0 pt-8 pb-4`}>
          <div className="left inline">
            <div className="text-2xl font-bold dark:text-white">Portfolio</div>
          </div>
          <div className="right inline">
            <Link className='text-main' href="/photo">All Portfolio</Link>
          </div>
        </div>
        <hr />
        <div className={`container max-w-[1000] pt-6 grid grid-cols-2 px-4 md:grid-cols-4 lg:px-0 gap-2 lg:gap-4`}>
          {album && album.map((album) => (
            <div key={album.url}>
              <Link className='scroll-my-12' href={`/album/${album.url}`} id={`${album.url}`}>
                <div className={`${style['protfolioEntryImg']} aspect-square`}>
                  <Image src={album.cover} className='rounded aspect-square object-cover' width={400} height={400} alt={album.title} />
                  <div className={`${style['protfolioEntryLayer']} flex flex-col justify-center items-center opacity-0 lg:hover:opacity-80 bg-zinc-950 text-white`} >
                    <div className='text-xl font-medium uppercase'>{album.title}</div>
                    <div className='text-sm opacity-75'>{format(parseISO(album.date), 'yyyy-MM-dd')}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className='container px-6 lg:px-8 max-w-[1280px] pt-20 pb-24'>
          <Image
            src="https://imgur.lzmun.com/picgo/logo/tripper2colorfull.png_avatar"
            alt="Picture of the author"
            className='center pt-6 pb-6'
            width={64}
            height={64}
            automatically="true"
            provided="true"
          />
          <Link href='mailto:aiokr@outlook.com' target='_blank'>
            <div className="text-xl text-center text-sub dark:text-white pb-4">Sean's secret world</div>
          </Link>
        </div>
      </div>
    </main >
  )
}