import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WordStation - Discover, Learn, Remember</title>
        <meta
          name="description"
          content="A modern and easy-to-use application for learning and memorising new words"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full p-16 flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold">
          WordStation - Discover, Learn, Remember
        </h1>
        <p className="text-lg text-center mx-auto text-slate-200">
          Expand your vocabulary and boost your language skills. WordStation is
          designed to make learning words engaging and effortless. You can
          explore a vast dictionary, &quot;like&quot; intriguing words, and dive
          deeper into their definitions, synonyms, and antonyms. Let the power
          of words inspire you on your journey to linguistic mastery.
        </p>
        <h2 className="text-3xl font-bold">Why WordStation?</h2>
        <ul className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/*TODO card component*/}
          <li className="rounded-lg p-6 bg-slate-800">
            Personalized Vocabulary Building: WordStation allows you to curate
            your own collection of captivating words. Browse through an
            extensive dictionary and &quot;like&quot; the words that catch your
            attention.
          </li>

          <li className="rounded-lg p-6 bg-slate-800">
            Explore Word Definitions: WordStation provides comprehensive
            definitions for any word, enabling you to grasp their precise
            context and usage. Enhance your understanding and become a more
            articulate communicator.
          </li>

          <li className="rounded-lg p-6 bg-slate-800">
            Synonyms and Antonyms at Your Fingertips: Ditch repetitive language
            and express yourself with flair. WordStation offers a treasure trove
            of synonyms and antonyms for every word. Discover alternative
            expressions and sharpen your writing and speaking skills.
          </li>

          <li className="rounded-lg p-6 bg-slate-800">
            Engaging and Intuitive Design: WordStation boasts a user-friendly
            interface that prioritizes simplicity and elegance. Enjoy a visually
            appealing experience that keeps you immersed in the world of words.
            Navigate seamlessly through definitions, synonyms, and antonyms with
            ease.
          </li>
        </ul>

        <p>
          Unlock the Power of Words with WordStation: Take your vocabulary to
          new heights and let the beauty of language inspire you. Download
          WordStation now and embark on an exciting journey of word exploration
          and mastery.
        </p>
      </main>
    </>
  );
}
