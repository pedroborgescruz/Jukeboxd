
export default function appDemo() {
    return (
      <div className="py-24 sm:py-36 bg-[#13091c]">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 accent-jukeboxd font-semibold">A social network for music lovers</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Everything you need for your music passion
          </p>
          <div className="mt-10 grid gap-2 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-[#1b0c27] border-1  border-solid border-[#44194d] lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-bold tracking-tight text-white max-lg:text-center">
                    Track what you stream
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                    Log the albums you listen as you go. Use Last.fm integration to give you some help.
                  </p>
                </div>
                <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-900 bg-gray-900 shadow-2xl">
                    <img
                      className="size-full object-cover object-top"
                      src="https://i.imgur.com/QuUkqmq.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-[#1b0c27] border-1 border-solid border-[#44194d] max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-bold tracking-tight text-white max-lg:text-center">
                    Leave a review
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                    Unleash your inner music critic and let the world know what's good and what's not.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    className="w-full max-lg:max-w-xs"
                    src="https://i.imgur.com/FPXLWXG.png"
                    alt="Music library"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-[#1b0c27] border-1 border-solid border-[#44194d]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-bold tracking-tight text-white max-lg:text-center">
                    Connect with friends
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                    Create community around your love for music. Meet new friends and share content with them.
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    className="h-[min(152px,40cqw)] object-cover"
                    src="https://i.imgur.com/LJCjs3z.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-[#1b0c27] border-1 border-solid border-[#44194d] max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-bold tracking-tight text-white max-lg:text-center">
                  Compile your own playlists
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                    Create lists for multiple purposes. Send your friends a personalized mixtape for their birthday.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl border border-[#44194d] bg-jukeboxd shadow-2xl">
                    <div className="flex bg-jukeboxd/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-jukeboxd/5 px-4 py-2 text-white">
                          Luke's Birthday
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">
                          My Favorites
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14">
                      <div className="space-y-4">

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65f9ba5e7f6a6f4c6c74a9d8/master/w_1600,c_limit/Beyonce-Cowboy-Carter.jpg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          <div>
                            <p>Cowboy Carter</p>
                            <p className='font-bold text-gray-500'>Beyoncé</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65babf56882ca58cb22a1947/master/w_1600,c_limit/Tyla-Tyla.jpeg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          <div>
                            <p>Tyla</p>
                            <p className='font-bold text-gray-500'>Tyla</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65b13a8954b682b8bc594dff/master/w_1600,c_limit/Empress-Of-For-Your-Consideration.jpg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          <div>
                            <p>For Your Consideration</p>
                            <p className='font-bold text-gray-500'>Empress Of</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65a6ccaa37e7c24b108f0e09/master/w_1600,c_limit/Adrianne-Lenker-Bright-Future.jpg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          <div>
                            <p>Bright Future</p>
                            <p className='font-bold text-gray-500'>Adrianne Lenker</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65dfd21824cf8305d775f0cd/master/w_1600,c_limit/Charli-XCX-Brat.jpg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          
                          <div>
                            <p>BRAT</p>
                            <p className='font-bold text-gray-500'>Charli xcx</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <img 
                            src="https://media.pitchfork.com/photos/65260753aeb62be7989dbd5e/master/w_1600,c_limit/Kali-Uchis-Orqui%CC%81deas.jpg"
                            className="w-10 border border-gray-600 rounded"
                            alt=""
                          />
                          <div>
                            <p>Orquídeas</p>
                            <p className='font-bold text-gray-500'>Kali Uchis</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  