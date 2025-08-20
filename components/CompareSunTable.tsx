// components/CompareSunTable.tsx
import React from "react";

type Cell = string | string[];

type Row = {
  label: string;
  left: Cell;
  right: Cell;
};

const rows: Row[] = [
  {
    label: "ค่า SPF / PA",
    left: "SPF50+ / ป้องกัน UVA, UVB, และ Long-UVA",
    right: "SPF50+ / ป้องกัน UVA, UVB",
  },
  {
    label: "เทคโนโลยีเด่น",
    left: [
      "Mexoryl 400 (ป้องกันรังสี UVA ที่ยาวที่สุดถึง ~400 nm)",
      "Cellox-B3 Tech ลดการทำร้ายผิวระยะยาว",
    ],
    right: [
      "Advanced Spectral Technology",
      "Licochalcone A & Glycyrrhetinic Acid ปกป้องเซลล์ผิว",
    ],
  },
  {
    label: "เนื้อสัมผัส",
    left: "เจลบางเบา ซึมไว ไม่เหนียวเหนอะหนะ",
    right: "ครีมเจล เนียน เกลี่ยง่าย",
  },
  {
    label: "ควบคุมความมัน",
    left: "Oil Control เหมาะสำหรับผิวมันและเป็นสิวง่าย",
    right: "Oil Control + มีส่วนผสม CC ปรับสีผิว",
  },
  {
    label: "ฟังก์ชันเสริม",
    left: "ป้องกันมลภาวะ และป้องกันริ้วรอยก่อนวัย",
    right: "มี CC Tint ปรับผิวให้สม่ำเสมอ (ช่วยลดการใช้รองพื้น)",
  },
  {
    label: "เหมาะกับผิว",
    left: "ผิวมัน-ผิวแพ้ง่าย",
    right: "ผิวมัน-ผิวผสม-มีรอยสิว ต้องการปกปิด",
  },
  { label: "ปริมาณ", left: "50ml", right: "50ml" },
  { label: "ราคา (ประมาณ)", left: "≈ ฿1,350", right: "≈ ฿1,400" }, // ปรับได้ตามหน้าร้าน
];

function renderCell(cell: Cell) {
  if (Array.isArray(cell)) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {cell.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return <span>{cell}</span>;
}

export default function CompareSunTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="min-w-[720px] w-full text-sm">
        <caption className="sr-only">
          เปรียบเทียบกันแดด: La Roche-Posay UVMune400 Oil Control Gel SPF50+ vs
          Eucerin Sun Dry Touch CC Oil Control SPF50+
        </caption>
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr className="text-left">
            <th className="p-3 w-48">คุณสมบัติ</th>
            <th className="p-3">
              La Roche-Posay Anthelios UVMune400 Oil Control Gel SPF50+
            </th>
            <th className="p-3">
              Eucerin Sun Dry Touch CC Oil Control SPF50+
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.label}
              className={i % 2 === 0 ? "bg-white dark:bg-gray-950" : ""}
            >
              <td className="p-3 font-medium align-top">{r.label}</td>
              <td className="p-3 align-top">{renderCell(r.left)}</td>
              <td className="p-3 align-top">{renderCell(r.right)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
