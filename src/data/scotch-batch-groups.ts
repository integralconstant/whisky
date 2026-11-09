export interface ScotchBatchGroup {
  id: string;
  name: string;
  englishName: string;
  representativeId: string;
  batches: { id: string; label: string }[];
}

// Explicit expression families only: age statements, finishes and .1/.2/.3
// Octomore expressions are not interchangeable batches of one product.
export const scotchBatchGroups: ScotchBatchGroup[] = [
  {
    id: "glenallachie-10-cask-strength",
    name: "글렌알라키 10년 캐스크 스트렝스",
    englishName: "The GlenAllachie 10 Year Old Cask Strength",
    representativeId: "glenallachie-10-cask-strength-batch-13",
    batches: [
      { id: "glenallachie-10-cask-strength-batch-13", label: "배치 13" },
      { id: "glenallachie-10-cask-strength-batch-12", label: "배치 12" },
      { id: "glenallachie-10-cask-strength-batch-11", label: "배치 11" },
      { id: "glenallachie-10-cask-strength-batch-10", label: "배치 10" },
      { id: "glenallachie-10-cask-strength-batch-9", label: "배치 9" },
      { id: "glenallachie-10-cask-strength-batch-8", label: "배치 8" },
      { id: "glenallachie-10-cask-strength-batch-7", label: "배치 7" },
      ...[6, 5, 4, 3, 2, 1].map((batch) => ({
        id: `glenallachie-10-cask-strength-batch-${batch}`,
        label: `배치 ${batch}`,
      })),
    ],
  },
  {
    id: "laphroaig-10-cask-strength",
    name: "라프로익 10년 캐스크 스트렝스",
    englishName: "Laphroaig 10 Year Old Cask Strength",
    representativeId: "laphroaig-10-cask-strength-batch-17",
    batches: [
      { id: "laphroaig-10-cask-strength-batch-17", label: "배치 17" },
      { id: "laphroaig-10-cask-strength-batch-16", label: "배치 16" },
      ...[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((batch) => ({
        id: `laphroaig-10-cask-strength-batch-${batch}`,
        label: `배치 ${batch}`,
      })),
    ],
  },
  {
    id: "bunnahabhain-12-cask-strength",
    name: "부나하벤 12년 캐스크 스트렝스",
    englishName: "Bunnahabhain 12 Year Old Cask Strength",
    representativeId: "bunnahabhain-12-cask-strength-2025",
    batches: [
      { id: "bunnahabhain-12-cask-strength-2025", label: "2025 에디션" },
      { id: "bunnahabhain-12-cask-strength-2023", label: "2023 에디션" },
    ],
  },
  {
    id: "octomore-islay-barley",
    name: "옥토모어 아일라 보리 (.3)",
    englishName: "Octomore Islay Barley (.3)",
    representativeId: "octomore-17-3",
    batches: [
      { id: "octomore-17-3", label: "17.3" },
      { id: "octomore-16-3", label: "16.3" },
    ],
  },
  {
    id: "tamdhu-batch-strength",
    name: "탐두 배치 스트렝스",
    englishName: "Tamdhu Batch Strength",
    representativeId: "tamdhu-batch-strength-008",
    batches: [
      { id: "tamdhu-batch-strength-008", label: "배치 008" },
      { id: "tamdhu-batch-strength-007", label: "배치 007" },
      { id: "tamdhu-batch-strength-006", label: "배치 006" },
    ],
  },
  {
    id: "glenallachie-21-cask-strength",
    name: "글렌알라키 21년 캐스크 스트렝스",
    englishName: "The GlenAllachie 21 Year Old Cask Strength",
    representativeId: "glenallachie-21-cask-strength-batch-7",
    batches: [7, 6, 5, 4, 3, 2, 1].map((batch) => ({
      id: `glenallachie-21-cask-strength-batch-${batch}`,
      label: `배치 ${batch}`,
    })),
  },
  {
    id: "glendronach-cask-strength",
    name: "글렌드로낙 캐스크 스트렝스",
    englishName: "The GlenDronach Cask Strength",
    representativeId: "glendronach-cask-strength-batch-12",
    batches: [12, 11, 10].map((batch) => ({
      id: `glendronach-cask-strength-batch-${batch}`,
      label: `배치 ${batch}`,
    })),
  },
  {
    id: "highland-park-cask-strength",
    name: "하이랜드 파크 캐스크 스트렝스",
    englishName: "Highland Park Cask Strength",
    representativeId: "highland-park-cask-strength-release-5",
    batches: [5, 4, 3, 2, 1].map((release) => ({
      id: `highland-park-cask-strength-release-${release}`,
      label: `릴리즈 ${release}`,
    })),
  },
  {
    id: "macnairs-lum-reek-10-cask-strength",
    name: "맥네어스 럼 릭 10년 캐스크 스트렝스",
    englishName: "MacNair's Lum Reek 10 Year Old Cask Strength",
    representativeId: "macnairs-lum-reek-10-cask-strength-batch-3",
    batches: [3, 2, 1].map((batch) => ({
      id: `macnairs-lum-reek-10-cask-strength-batch-${batch}`,
      label: `배치 ${batch}`,
    })),
  },
];
