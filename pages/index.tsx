import Head from "next/head";
import Link from "next/link";

import { TextCard } from "features/homepage";

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

      <div className="flex gap-6 justify-end w-full border-b border-slate-50 text-black p-2 bg-white h-16 ">
        <Link
          className="flex items-center text-lg rounded-lg transition-colors duration-500 whitespace-nowrap hover:text-green-700 mr-4"
          href="/login"
        >
          Log In
        </Link>
      </div>
      <main className="h-full p-20 flex flex-col items-center gap-8 overflow-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          WordStation - Discover, Learn, Remember
        </h1>
        <p className="text-md sm:text-lg mx-auto text-slate-200">
          Expand your vocabulary and boost your language skills. WordStation is
          designed to make learning words engaging and effortless. You can
          explore a vast dictionary, like intriguing words, and dive deeper into
          their definitions, synonyms, and antonyms. Let the power of words
          inspire you on your journey to linguistic mastery.
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold">Why WordStation?</h2>
        <ul className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TextCard
            text="Personalized Vocabulary Building: WordStation allows you to curate your own collection of captivating words. Browse through an
            extensive dictionary and like the words that catch your
            attention."
          />
          <TextCard
            text="Explore Word Definitions: WordStation provides comprehensive
            definitions for any word, enabling you to grasp their precise
            context and usage. Enhance your understanding and become a more
            articulate communicator."
          />
          <TextCard
            text="Synonyms and Antonyms at Your Fingertips: Ditch repetitive language
            and express yourself with flair. WordStation offers a treasure trove
            of synonyms and antonyms for every word. Discover alternative
            expressions and sharpen your writing and speaking skills."
          ></TextCard>
          <TextCard
            text="Engaging and Intuitive Design: WordStation boasts a user-friendly
            interface that prioritizes simplicity and elegance. Enjoy a visually
            appealing experience that keeps you immersed in the world of words.
            Navigate seamlessly through definitions, synonyms, and antonyms with
            ease."
          ></TextCard>
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
