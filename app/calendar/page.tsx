"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CalendarPage() {
  const router = useRouter();

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const [nickname, setNickname] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 로그인 체크
  useEffect(() => {
    const name = localStorage.getItem("nickname");

    if (!name) {
      router.replace("/join");
      return;
    }

    setNickname(name);
  }, []);

  // 내 데이터
  useEffect(() => {
    if (!nickname) return;

    const load = async () => {
      setLoading(true);

      const snap = await getDoc(doc(db, "users", nickname));

      if (snap.exists()) {
        setSelectedDates(snap.data().dates || []);
      }

      setLoading(false);
    };

    load();
  }, [nickname]);

  // 전체 유저 (실시간)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      setAllUsers(snap.docs.map((d) => d.data()));
    });

    return () => unsub();
  }, []);

  // 날짜별 유저
  const getUsersForDate = (date: number) => {
    return allUsers
      .filter((u) => u.dates?.includes(date))
      .map((u) => u.nickname);
  };

  // 저장
  const updateDates = async (newDates: number[]) => {
    if (!nickname) return;

    setSelectedDates(newDates);

    await setDoc(
      doc(db, "users", nickname),
      {
        nickname,
        dates: newDates
      },
      { merge: true }
    );
  };

  const toggleDate = (date: number) => {
    const newDates = selectedDates.includes(date)
      ? selectedDates.filter((d) => d !== date)
      : [...selectedDates, date];

    updateDates(newDates);
  };

  // 후보 날짜 계산 함수 추가
  const getTopDates = () => {
    const count: Record<number, number> = {};

    allUsers.forEach((user) => {
      (user.dates || []).forEach((d: number) => {
        count[d] = (count[d] || 0) + 1;
      });
    });

    const max = Math.max(...Object.values(count), 0);

    const topDates = Object.entries(count)
      .filter(([_, v]) => v === max)
      .map(([k]) => Number(k))
      .sort((a, b) => a - b);

    return { topDates, max };
  };

  const { topDates, max } = getTopDates();

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-pink-300 via-cyan-300 to-green-300">

      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">

        <Link
          href="/join"
          className="bg-white px-4 py-2 rounded-xl shadow font-bold"
        >
          ← 뒤로가기
        </Link>

        <h1 className="text-4xl font-bold text-white">
          📅 2026년 7월
        </h1>

        <div className="bg-white px-3 py-1 rounded-xl font-bold">
          {nickname}
        </div>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center font-bold mb-3 text-white">
        <div>일</div><div>월</div><div>화</div><div>수</div>
        <div>목</div><div>금</div><div>토</div>
      </div>

      <div className="bg-white rounded-3xl p-6">

        {loading ? (
          <p className="font-bold">로딩중...</p>
        ) : (
          <>
            {/* 달력 */}
            <div className="grid grid-cols-7 gap-3">

              <div></div><div></div><div></div>

              {dates.map((date) => {
                const users = getUsersForDate(date);

                return (
                  <button
                    key={date}
                    onClick={() => toggleDate(date)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center font-bold
                      ${
                        selectedDates.includes(date)
                          ? "bg-pink-500 text-white"
                          : "bg-pink-100"
                      }`}
                  >
                    <div className="text-lg">{date}</div>

                    {users.length > 0 && (
                      <div className="text-[11px] mt-1 text-center">
                        <div>{users.length}명</div>
                        <div className="truncate">
                          {users.join(", ")}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 내 선택 */}
            <div className="mt-6 p-4 bg-pink-50 rounded-xl">
              <h3 className="font-bold mb-2">내 선택 날짜</h3>

              {selectedDates.length === 0 ? (
                <p>없음</p>
              ) : (
                <p>
                  {[...selectedDates]
                    .sort((a, b) => a - b)
                    .join("일, ") + "일"}
                </p>
              )}
            </div>

            {/* 후보 날짜 통계 */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-bold mb-2">가장 많이 겹치는 날짜</h3>

              {max === 0 ? (
                <p>아직 데이터 없음</p>
              ) : (
                <>
                  <p className="font-bold text-lg">
                    {topDates.join("일, ")}일 ({max}명)
                  </p>

                  <p className="text-sm text-gray-600">
                    전체 기준 가장 많이 선택된 날짜
                  </p>
                </>
              )}
            </div>

          </>
        )}

      </div>
    </main>
  );
}
