"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function JoinPage() {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleJoin = async () => {
    if (!nickname) return alert("닉네임 입력");

    const ref = doc(db, "users", nickname);
    const snap = await getDoc(ref);

    // 최초 생성만
    if (!snap.exists()) {
      await setDoc(ref, {
        nickname,
        createdAt: new Date(),
        dates: []
      });
    }

    localStorage.setItem("nickname", nickname);

    router.push("/calendar");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-300 via-cyan-300 to-green-300 flex items-center justify-center p-6">

      {/* 🔥 메인화면 버튼 */}
      <Link
        href="/"
        className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl shadow-md font-bold hover:scale-105 transition"
      >
        ← 메인화면
      </Link>

      {/* 카드 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">

        <h1 className="text-4xl font-bold mb-2">
          🌿 지니의 놀이터 입장
        </h1>

        <p className="text-gray-600 mb-6">
          오프라인 모임 참가를 위한 닉네임을 입력해주세요
        </p>

        {/* 안내 */}
        <div className="bg-pink-100 rounded-xl p-4 mb-6">
          🦎 중복 닉네임은 자동으로 차단됩니다
        </div>

        {/* input */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 입력"
          className="w-full border-2 border-pink-300 rounded-xl px-4 py-3 text-center text-lg mb-4 focus:outline-none focus:border-pink-500"
        />

        {/* 버튼 */}
        <button
          onClick={handleJoin}
          className="w-full bg-pink-500 text-white py-3 rounded-xl text-lg font-bold hover:scale-105 transition"
        >
          입장하기
        </button>
      </div>
    </main>
  );
}