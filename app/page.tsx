import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-300 via-cyan-300 to-green-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold mb-4">
          지니의 놀이터
        </h1>

        <h2 className="text-3xl font-bold mb-6">
          첫 오프라인 모임
        </h2>

        <div className="bg-pink-100 rounded-xl p-4 mb-4">
          하양역 근처
          <br />
          픽업 가능
          <br />
          다음날 곱창전골 제공 예정
        </div>

        <div className="bg-yellow-100 rounded-xl p-4 mb-6">
          날짜 : 지금 정하자!
        </div>

        <Link
          href="/join"
          className="bg-pink-500 text-white px-6 py-3 rounded-xl text-lg font-bold hover:scale-105 transition inline-block"
        >
          참가하기
        </Link>
      </div>
    </main>
  );
}