import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Flame,
  GlassWater,
  Globe2,
  Leaf,
  Martini,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Wine,
  X,
} from "lucide-react";
import { whiskies } from "./data/whiskies";
import { whiskyImages } from "./data/whisky-images";
import { cocktails } from "./data/cocktails";
import { whiskyFlavorGroups } from "./data/flavors";
import type { Cocktail, Whisky } from "./data/types";
import {
  filterCatalog,
  CASK_STRENGTH_TAG,
  getCatalogTags,
  formatWhiskyAbv,
  isWhisky,
  readSaved,
  scaleAmount,
  getWhiskyPrice,
  paginateCatalog,
  getPaginationPages,
  PAGE_SIZES,
} from "./lib/catalog";
import type { CatalogItem, SortOrder, PageSize } from "./lib/catalog";
import {
  collapseScotchBatches,
  getScotchBatchGroup,
  getScotchBatches,
} from "./lib/batches";

type Menu = "whisky" | "cocktail";
const cocktailTags = [
  "달콤한",
  "상큼한",
  "쌉싸름한",
  "묵직한",
  "청량한",
  "스모키",
  "부드러운",
  "커피",
  "과일",
  "허브",
];
const bottleImages: Record<string, string> = {
  "glenfiddich-12": "/images/glenfiddich-12.jpg",
  "balvenie-12-doublewood": "/images/balvenie-12.jpg",
  "macallan-12-sherry": "/images/macallan-12.jpg",
  "glenmorangie-original-12": "/images/glenmorangie-12.jpg",
  "lagavulin-16": "/images/lagavulin-16.jpg",
  "ardbeg-10": "/images/ardbeg-10.jpg",
  "old-fashioned": "/images/old-fashioned.jpg",
};
const tagIcons: Record<string, typeof Leaf> = {
  피트: Flame,
  셰리: Wine,
  과일: Leaf,
  부드러운: Sparkles,
  상큼한: Leaf,
  청량한: GlassWater,
};

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <span className="brand-icon">
        <GlassWater strokeWidth={1.65} />
      </span>
      <span>
        WHISKY<span className="brand-note"> NOTE</span>
        <small>FIND YOUR SPIRIT</small>
      </span>
    </span>
  );
}

function BottleIllustration({ item }: { item: CatalogItem }) {
  const id = `bottle-${item.id}`;
  if (!isWhisky(item))
    return (
      <svg
        className="drink-illustration"
        viewBox="0 0 210 250"
        role="img"
        aria-label={`${item.name} 일러스트`}
      >
        <defs>
          <linearGradient id={id} x2="0" y2="1">
            <stop stopColor="#c78128" />
            <stop offset="1" stopColor="#93501f" />
          </linearGradient>
        </defs>
        <ellipse
          cx="105"
          cy="220"
          rx="65"
          ry="9"
          fill="#352816"
          opacity=".08"
        />
        <path
          d="M50 89h110l-12 118q-43 15-86 0Z"
          fill="#fff"
          fillOpacity=".38"
          stroke="#b8ac95"
          strokeWidth="2"
        />
        <path
          d="m55 133 8 71q42 15 84 0l7-71Z"
          fill={`url(#${id})`}
          opacity=".9"
        />
        <rect
          x="76"
          y="111"
          width="42"
          height="42"
          rx="6"
          transform="rotate(16 96 132)"
          fill="#fff"
          fillOpacity=".38"
          stroke="#fff"
          strokeOpacity=".7"
        />
        <rect
          x="99"
          y="156"
          width="32"
          height="32"
          rx="5"
          transform="rotate(-12 115 172)"
          fill="#fff"
          fillOpacity=".22"
        />
        <path
          d="M143 108c-35-2-58-32-32-56 17-15 48 0 37 20-6 11-28 11-28-2"
          fill="none"
          stroke="#e9992f"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="m56 94 12 105" stroke="#fff" opacity=".6" strokeWidth="4" />
      </svg>
    );
  const dark = ["피트", "스모키"].some((tag) => item.tags.includes(tag));
  return (
    <svg
      className="bottle-illustration"
      viewBox="0 0 180 300"
      role="img"
      aria-label={`${item.name} 병 일러스트`}
    >
      <defs>
        <linearGradient id={id}>
          <stop stopColor={dark ? "#293b2b" : "#a56320"} />
          <stop offset=".35" stopColor={dark ? "#526448" : "#d3a453"} />
          <stop offset=".8" stopColor={dark ? "#344332" : "#bd8332"} />
          <stop offset="1" stopColor={dark ? "#1e2e20" : "#865022"} />
        </linearGradient>
      </defs>
      <ellipse cx="90" cy="284" rx="56" ry="7" fill="#30271d" opacity=".09" />
      <path
        d="M71 31h38v48c0 20 35 23 37 46v142q0 13-16 13H50q-16 0-16-13V125c2-23 37-26 37-46Z"
        fill={`url(#${id})`}
      />
      <path
        d="M44 125v135q0 9 9 9"
        fill="none"
        stroke="#fff"
        strokeOpacity=".24"
        strokeWidth="5"
      />
      <rect
        x="68"
        y="13"
        width="44"
        height="30"
        rx="4"
        fill={dark ? "#252b24" : "#4e3829"}
      />
      <path d="M71 20h38m-38 5h38m-38 5h38" stroke="#fff" opacity=".12" />
      <rect x="42" y="137" width="96" height="104" rx="1" fill="#f5efd9" />
      <rect
        x="47"
        y="142"
        width="86"
        height="94"
        rx="1"
        fill="none"
        stroke="#b4a17d"
        strokeWidth=".6"
      />
      <text
        x="90"
        y="164"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="9"
        letterSpacing="1"
        fill="#444034"
      >
        {item.brand.toUpperCase().slice(0, 16)}
      </text>
      <path d="M67 178h46" stroke="#a58b53" strokeWidth=".7" />
      <text
        x="90"
        y="207"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="30"
        fill="#554834"
      >
        {item.age ?? "W"}
      </text>
      <text
        x="90"
        y="224"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="6.5"
        letterSpacing="1.5"
        fill="#766b56"
      >
        {item.age ? "YEARS OLD" : "FINE WHISKY"}
      </text>
    </svg>
  );
}

function ProductImage({ item }: { item: CatalogItem }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src =
    bottleImages[item.id] || whiskyImages[item.id]?.path || item.image;
  const imageSrc = src?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src;
  return imageSrc && failedSrc !== imageSrc ? (
    <img
      className={isWhisky(item) ? "bottle-photo" : "cocktail-photo"}
      src={imageSrc}
      alt={item.name}
      loading="lazy"
      onError={() => setFailedSrc(imageSrc)}
    />
  ) : (
    <BottleIllustration item={item} />
  );
}

const won = new Intl.NumberFormat("ko-KR");

function WhiskyPrice({
  item,
  detailed = false,
}: {
  item: Whisky;
  detailed?: boolean;
}) {
  const amount = getWhiskyPrice(item);
  const price = amount === null ? undefined : item.dailyshotPrice;
  const sourceUrl =
    price?.sourceUrl ??
    item.dailyshotProduct?.url ??
    `https://dailyshot.co/m/search/result?q=${encodeURIComponent(item.name)}`;
  const checkedDate = price
    ? new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "medium",
        timeZone: "Asia/Seoul",
      }).format(new Date(price.checkedAt))
    : "";

  return (
    <div className={`whisky-price ${detailed ? "whisky-price-detailed" : ""}`}>
      <span className="price-label">데일리샷 스토어 평균</span>
      <div className="price-value" data-price={amount ?? ""}>
        {amount === null ? (
          <span className="price-unavailable">가격 정보 없음</span>
        ) : (
          <>
            <strong>{won.format(amount)}</strong>
            <span>원</span>
          </>
        )}
      </div>
      {price && (
        <span className="price-caption">
          {price.volumeMl.toLocaleString("ko-KR")} ml · 판매가{" "}
          {price.sampleCount.toLocaleString("ko-KR")}건
        </span>
      )}
      {!detailed && price?.note && (
        <span className="price-caption">배치별 판매 조건 확인</span>
      )}
      {detailed && (
        <>
          {(price?.note || item.dailyshotProduct?.note) && (
            <p className="price-context price-batch-note">
              {price?.note || item.dailyshotProduct?.note}
            </p>
          )}
          {price ? (
            <>
              <p className="price-context">
                {checkedDate} 확인 · 동일 제품·용량의 판매 중인 스토어 등록가
                기준입니다. 매장과 프로모션에 따라 실제 결제 금액이 달라질 수
                있습니다.
              </p>
              <div className="price-range">
                <span>최저 {won.format(price.min)}원</span>
                <span>최고 {won.format(price.max)}원</span>
              </div>
              <details className="price-offers">
                <summary>
                  평균 산정에 사용한 판매가 {price.sampleCount}건{" "}
                  <ChevronDown size={13} />
                </summary>
                <ul>
                  {price.offers.map((offer, index) => (
                    <li key={`${offer.url}-${index}`}>
                      <a href={offer.url} target="_blank" rel="noreferrer">
                        {offer.seller}
                        <ExternalLink size={11} />
                      </a>
                      <strong>{won.format(offer.price)}원</strong>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          ) : (
            <p className="price-context">
              동일 제품·용량으로 확인된 판매가가 없습니다. 데일리샷에서 현재
              등록 정보를 확인해 보세요.
            </p>
          )}
          <a
            className="dailyshot-link"
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {item.dailyshotProduct?.scope === "other-batches"
              ? "데일리샷 다른 배치 보기"
              : item.dailyshotProduct?.scope === "search"
                ? "데일리샷에서 검색"
                : "데일리샷에서 확인"}{" "}
            <ExternalLink size={13} />
          </a>
        </>
      )}
    </div>
  );
}

function Card({
  item,
  saved,
  onSave,
  onOpen,
  onTag,
}: {
  item: CatalogItem;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  onTag: (tag: string) => void;
}) {
  const whisky = isWhisky(item);
  const batchGroup = getScotchBatchGroup(item);
  const batches = getScotchBatches(item, whiskies);
  const displayName = batchGroup?.name ?? item.name;
  return (
    <article className="product-card" data-product-id={item.id}>
      <div
        className="product-visual"
        style={{ "--card-color": item.color } as CSSProperties}
      >
        <span className="product-category">
          {whisky ? item.category : item.base + " 베이스"}
        </span>
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          onClick={onSave}
          aria-pressed={saved}
          aria-label={`${item.name} ${saved ? "저장 취소" : "저장"}`}
          title={saved ? "저장 취소" : "내 컬렉션에 저장"}
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className="product-image-button"
          onClick={onOpen}
          aria-label={`${displayName} 상세 보기`}
        >
          <ProductImage item={item} />
        </button>
        {item.featured && (
          <span className="editors-pick">
            <span /> EDITOR’S PICK
          </span>
        )}
        <button
          className="quick-view"
          onClick={onOpen}
          aria-label={`${item.name} ${whisky ? "정보" : "레시피"} 보기`}
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-origin">
          {whisky ? (
            <>
              <span>{item.country}</span>
              <span className="dot">·</span>
              {item.region}
            </>
          ) : (
            <>
              <Clock3 size={12} /> {item.time}분<span className="dot">·</span>
              {item.difficulty}
            </>
          )}
        </div>
        <button className="product-title" onClick={onOpen}>
          {displayName}
        </button>
        <p className="english-name">
          {batchGroup?.englishName ?? item.englishName}
        </p>
        {batches.length > 1 && (
          <button className="batch-card-label" onClick={onOpen}>
            배치 {batches.length}개 ·{" "}
            {batches.find((batch) => batch.item.id === item.id)?.label} 기준
            <ChevronDown size={12} />
          </button>
        )}
        <div className="product-tags">
          {getCatalogTags(item)
            .slice(0, 3)
            .map((tag) => (
              <button key={tag} onClick={() => onTag(tag)}>
                #{tag}
              </button>
            ))}
        </div>
        {whisky && <WhiskyPrice item={item} />}
        <div className="product-meta">
          <span>
            {whisky ? (
              <>
                <strong>{formatWhiskyAbv(item)}</strong> ALC / VOL
                {item.abvNote && (
                  <small className="abv-batch" title={item.abvNote}>
                    {item.abvRange ? "배치별 상이" : "표기 배치 기준"}
                  </small>
                )}
              </>
            ) : (
              item.glass
            )}
          </span>
          <button onClick={onOpen}>
            {whisky ? "자세히 보기" : "레시피 보기"}
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

function DetailModal({
  item,
  saved,
  onSave,
  onClose,
  onRelated,
  onBatchChange,
}: {
  item: CatalogItem;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
  onRelated: (item: Cocktail) => void;
  onBatchChange: (item: Whisky) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [servings, setServings] = useState(1);
  const [copyStatus, setCopyStatus] = useState("");
  const whisky = isWhisky(item);
  const batches = getScotchBatches(item, whiskies);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = ref.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select, [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);
  useEffect(() => {
    setServings(1);
    setCopyStatus("");
  }, [item.id]);

  async function copyRecipe() {
    if (isWhisky(item)) return;
    const text = `${item.name} (${servings}잔)\n\n${item.ingredients.map((ingredient) => `${ingredient.name} ${scaleAmount(ingredient.amount, servings)}`).join("\n")}\n\n${item.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}\n\n출처: ${item.source}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("레시피를 복사했어요");
    } catch {
      setCopyStatus("복사할 수 없어요. 레시피를 선택해 복사해 주세요.");
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="detail-modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <button
          ref={closeRef}
          className="modal-close icon-button"
          onClick={onClose}
          aria-label="상세 보기 닫기"
        >
          <X size={22} />
        </button>
        <div className="detail-intro">
          <div
            className="detail-image"
            style={{ "--card-color": item.color } as CSSProperties}
          >
            <span className="eyebrow">
              {whisky ? "THE WHISKY COLLECTION" : "THE COCKTAIL COLLECTION"}
            </span>
            <ProductImage item={item} />
            <span className="detail-image-caption">
              {whisky ? item.country + " · " + item.region : item.glass}
            </span>
          </div>
          <div className="detail-heading">
            <span className="section-eyebrow">{item.category}</span>
            <h2 id="detail-title">{item.name}</h2>
            <p className="detail-english">{item.englishName}</p>
            {batches.length > 1 && (
              <div className="batch-picker">
                <label htmlFor="whisky-batch">배치 선택</label>
                <select
                  id="whisky-batch"
                  value={item.id}
                  onChange={(event) => {
                    const selected = batches.find(
                      (batch) => batch.item.id === event.target.value,
                    );
                    if (selected) onBatchChange(selected.item);
                  }}
                >
                  {batches.map((batch) => (
                    <option key={batch.item.id} value={batch.item.id}>
                      {batch.label} · {formatWhiskyAbv(batch.item)}
                    </option>
                  ))}
                </select>
                <p aria-live="polite">
                  선택한 배치의 사진·도수·향미·판매가를 표시합니다.
                </p>
              </div>
            )}
            <p className="detail-description">{item.description}</p>
            <div className="detail-tags">
              {getCatalogTags(item).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div className="detail-facts">
              {whisky ? (
                <>
                  <div>
                    <span>알코올 도수</span>
                    <strong>{formatWhiskyAbv(item)}</strong>
                  </div>
                  <div>
                    <span>숙성 연수</span>
                    <strong>
                      {item.age ? `${item.age}년` : "연수 미표기"}
                    </strong>
                  </div>
                  <div>
                    <span>생산지</span>
                    <strong>{item.country}</strong>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span>준비 시간</span>
                    <strong>{item.time}분</strong>
                  </div>
                  <div>
                    <span>난이도</span>
                    <strong>{item.difficulty}</strong>
                  </div>
                  <div>
                    <span>베이스</span>
                    <strong>{item.base}</strong>
                  </div>
                </>
              )}
            </div>
            {whisky && item.abvNote && (
              <p className="abv-note">{item.abvNote}</p>
            )}
            {whisky && <WhiskyPrice item={item} detailed />}
            <button
              className={`button detail-save ${saved ? "saved" : ""}`}
              onClick={onSave}
            >
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              {saved ? "내 컬렉션에 저장됨" : "내 컬렉션에 저장"}
            </button>
          </div>
        </div>
        <div className="detail-body">
          {whisky ? (
            <>
              <div className="detail-section-heading">
                <h3>한 잔에 담긴 이야기</h3>
                <span>TASTING NOTES</span>
              </div>
              <div className="tasting-notes">
                {[
                  ["Nose", "향", item.notes.nose],
                  ["Palate", "맛", item.notes.palate],
                  ["Finish", "여운", item.notes.finish],
                ].map(([english, label, description], index) => (
                  <div key={english}>
                    <span className="note-number">0{index + 1}</span>
                    <h4>
                      {label}
                      <small>{english}</small>
                    </h4>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
              <div className="related-recipe">
                <div>
                  <span className="section-eyebrow">
                    A DIFFERENT WAY TO ENJOY
                  </span>
                  <h3>칵테일로 만나는 위스키</h3>
                  <p>같은 베이스, 또 다른 매력을 발견해 보세요.</p>
                </div>
                <button
                  className="button button-light"
                  onClick={() =>
                    onRelated(
                      cocktails.find(
                        (cocktail) => cocktail.id === "old-fashioned",
                      ) ?? cocktails[0],
                    )
                  }
                >
                  올드 패션드 레시피
                  <ArrowRight size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="recipe-layout">
              <section className="ingredients">
                <div className="detail-section-heading">
                  <h3>준비할 재료</h3>
                  <div className="servings">
                    <button
                      disabled={servings === 1}
                      onClick={() => setServings((value) => value - 1)}
                      aria-label="한 잔 줄이기"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{servings}잔</span>
                    <button
                      disabled={servings === 6}
                      onClick={() => setServings((value) => value + 1)}
                      aria-label="한 잔 늘리기"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <ul>
                  {item.ingredients.map((ingredient, index) => (
                    <li key={`${ingredient.name}-${index}`}>
                      <span>{ingredient.name}</span>
                      <strong>
                        {scaleAmount(ingredient.amount, servings)}
                      </strong>
                    </li>
                  ))}
                </ul>
                <p className="recipe-tip">
                  <GlassWater size={16} />
                  추천 잔 · {item.glass}
                </p>
              </section>
              <section className="recipe-steps">
                <div className="detail-section-heading">
                  <h3>이렇게 만들어 보세요</h3>
                  <span>HOW TO MAKE</span>
                </div>
                <ol>
                  {item.steps.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
                <button className="copy-button" onClick={copyRecipe}>
                  <Copy size={15} />
                  레시피 복사
                </button>
                <span className="copy-status" role="status">
                  {copyStatus}
                </span>
              </section>
            </div>
          )}
          <div className="source-note">
            <span>
              공식 브랜드와 레시피 자료를 바탕으로 정리했습니다.
              {whisky
                ? " 도수와 풍미는 출시 국가·연도·배치에 따라 다를 수 있습니다."
                : ""}
            </span>
            <a href={item.source} target="_blank" rel="noreferrer">
              제품 출처 보기
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState<Menu>("whisky");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOrder>("featured");
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return readSaved(localStorage.getItem("whisky-note-saved"));
    } catch {
      return [];
    }
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [detail, setDetail] = useState<CatalogItem | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [toast, setToast] = useState("");
  const closeDetail = useCallback(() => setDetail(null), []);
  const searchRef = useRef<HTMLInputElement>(null);
  const archiveRef = useRef<HTMLElement>(null);
  const mobileFilterButtonRef = useRef<HTMLButtonElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const isWhiskyMenu = menu === "whisky";
  const allItems = isWhiskyMenu ? whiskies : cocktails;
  const allListItems = useMemo(
    () => collapseScotchBatches<CatalogItem>(allItems),
    [allItems],
  );
  const categories = isWhiskyMenu
    ? [...new Set(whiskies.map((item) => item.category))]
    : ["위스키", "진", "럼", "데킬라", "보드카"];
  const allCountries = [...new Set(whiskies.map((item) => item.country))];
  const activeCount = Number(!!category) + countries.length + tags.length;
  const results = useMemo(
    () =>
      filterCatalog<CatalogItem>(
        allItems,
        {
          query,
          category,
          countries,
          tags,
          savedOnly,
          saved,
          sort,
        },
        { groupBatches: true },
      ),
    [allItems, query, category, countries, tags, savedOnly, saved, sort],
  );
  const pagination = paginateCatalog<CatalogItem>(results, page, pageSize);
  const flavorGroups = isWhiskyMenu
    ? [
        { id: "bottling", label: "병입 방식", tags: [CASK_STRENGTH_TAG] },
        ...whiskyFlavorGroups,
      ]
    : [{ id: "cocktail", label: "칵테일의 맛과 분위기", tags: cocktailTags }];
  const flavorCounts = useMemo(() => {
    const groups = new Map<string, Set<string>>();
    for (const item of allItems)
      for (const tag of getCatalogTags(item)) {
        if (!groups.has(tag)) groups.set(tag, new Set());
        groups.get(tag)!.add(getScotchBatchGroup(item)?.id ?? item.id);
      }
    return new Map([...groups].map(([tag, ids]) => [tag, ids.size]));
  }, [allItems]);
  const collectionCount = collapseScotchBatches<CatalogItem>(
    allItems.filter((item) => saved.includes(item.id)),
  ).length;
  const totalSavedCount = collapseScotchBatches<CatalogItem>(
    [...whiskies, ...cocktails].filter((item) => saved.includes(item.id)),
  ).length;

  useEffect(() => {
    try {
      localStorage.setItem("whisky-note-saved", JSON.stringify(saved));
    } catch {
      setToast(
        "브라우저 저장 공간을 사용할 수 없어 이번 방문 동안만 저장됩니다.",
      );
    }
  }, [saved]);
  useEffect(() => {
    setPage(1);
  }, [menu, query, category, countries, tags, savedOnly, sort, pageSize]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        detail ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      )
        return;
      if (
        event.key === "/" ||
        ((event.ctrlKey || event.metaKey) && event.key === "k")
      ) {
        event.preventDefault();
        searchRef.current?.focus();
        archiveRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [detail]);

  function resetFilters() {
    setQuery("");
    setCategory("");
    setCountries([]);
    setTags([]);
  }
  function goToPage(next: number) {
    setPage(next);
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }
  function changeMenu(next: Menu) {
    if (menu === next) {
      setSavedOnly(false);
      return;
    }
    setMenu(next);
    resetFilters();
    setSort("featured");
    setMobileFilters(false);
  }
  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    );
  }
  function toggleSave(item: CatalogItem) {
    setSaved((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    );
    setToast(
      saved.includes(item.id)
        ? "컬렉션에서 삭제했습니다."
        : "내 컬렉션에 저장했습니다.",
    );
  }
  function browse() {
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <a className="skip-link" href="#archive">
        콘텐츠로 건너뛰기
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand-button"
            aria-label="위스키 노트 홈"
            onClick={() => {
              changeMenu("whisky");
              setSavedOnly(false);
              resetFilters();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BrandMark />
          </button>
          <nav aria-label="주 메뉴">
            <button
              className={isWhiskyMenu ? "nav-link active" : "nav-link"}
              onClick={() => changeMenu("whisky")}
              aria-current={isWhiskyMenu ? "page" : undefined}
            >
              <GlassWater size={17} />
              위스키<span>Whisky</span>
            </button>
            <button
              className={!isWhiskyMenu ? "nav-link active" : "nav-link"}
              onClick={() => changeMenu("cocktail")}
              aria-current={!isWhiskyMenu ? "page" : undefined}
            >
              <Martini size={18} />
              칵테일<span>Cocktail</span>
            </button>
          </nav>
          <button
            className={`collection-button ${savedOnly ? "active" : ""}`}
            onClick={() => {
              setSavedOnly((value) => !value);
              resetFilters();
              browse();
            }}
            aria-pressed={savedOnly}
          >
            <Bookmark size={17} fill={savedOnly ? "currentColor" : "none"} />
            <span>내 컬렉션</span>
            <small>{totalSavedCount}</small>
          </button>
        </div>
      </header>

      <main>
        <section
          className={`hero ${!isWhiskyMenu ? "cocktail-hero" : ""}`}
          aria-label="위스키 노트 소개"
        >
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span /> A LITTLE KNOWLEDGE. A BETTER SIP.
            </div>
            <h1>
              {isWhiskyMenu ? (
                <>
                  한 잔의 취향,
                  <br />
                  당신만의 <em>발견.</em>
                </>
              ) : (
                <>
                  섞을수록 새롭게,
                  <br />
                  나만의 <em>한 잔.</em>
                </>
              )}
            </h1>
            <p>
              {isWhiskyMenu ? (
                <>
                  위스키의 깊은 이야기부터 나를 닮은 향과 맛까지.
                  <br />
                  취향을 발견하는 가장 즐거운 여정이 시작됩니다.
                </>
              ) : (
                <>
                  클래식한 한 잔부터 오늘의 기분에 맞는 레시피까지.
                  <br />
                  좋아하는 재료와 맛으로 당신의 홈 바를 채워보세요.
                </>
              )}
            </p>
            <button className="hero-button" onClick={browse}>
              {isWhiskyMenu ? "나의 위스키 찾기" : "칵테일 레시피 둘러보기"}
              <ArrowRight size={17} />
            </button>
            <div className="hero-bottom">
              <span className="tiny-star">✳</span>
              <span>Every bottle has a story. Find yours.</span>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src={
                isWhiskyMenu
                  ? "/images/whisky-hero.jpg"
                  : "/images/old-fashioned.jpg"
              }
              alt={
                isWhiskyMenu
                  ? "나무 테이블 위 앰버 빛 위스키가 담긴 잔"
                  : "정성스럽게 만든 칵테일"
              }
              fetchPriority="high"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
            <div className="hero-photo-shade" />
            <span className="hero-photo-label">
              <span /> THE ART OF SLOW SIPPING
            </span>
            <div className="hero-photo-caption">
              <span>
                {isWhiskyMenu
                  ? "A world of character,"
                  : "A beautiful balance,"}
                <br />
                <em>
                  {isWhiskyMenu
                    ? "one sip at a time."
                    : "one recipe at a time."}
                </em>
              </span>
              <button
                onClick={() =>
                  setDetail(isWhiskyMenu ? whiskies[0] : cocktails[0])
                }
                aria-label="오늘의 한 잔 상세 보기"
              >
                <ArrowRight size={23} strokeWidth={1.3} />
              </button>
            </div>
            <span className="photo-index">
              {isWhiskyMenu ? "01" : "02"}
              <span> / 02</span>
            </span>
          </div>
        </section>

        <section className="discovery-strip" aria-label="인기 태그">
          <span className="discovery-label">
            <Sparkles size={16} />
            어떤 취향을 찾고 있나요?
          </span>
          <div className="discovery-tags">
            {(isWhiskyMenu
              ? ["피트", "셰리", "과일", "부드러운"]
              : ["상큼한", "달콤한", "쌉싸름한", "청량한"]
            ).map((tag) => {
              const Icon = tagIcons[tag] ?? Martini;
              return (
                <button
                  key={tag}
                  className={tags.includes(tag) ? "selected" : ""}
                  onClick={() => {
                    toggleTag(tag);
                    browse();
                  }}
                >
                  <Icon size={14} />
                  {tag === "피트"
                    ? "매력적인 피트"
                    : tag === "셰리"
                      ? "깊고 달콤한 셰리"
                      : tag === "과일"
                        ? "싱그러운 과일 향"
                        : tag === "부드러운"
                          ? "부드러운 첫 한 잔"
                          : tag + " 한 잔"}
                  <ChevronRight size={13} />
                </button>
              );
            })}
          </div>
          <span className="discovery-end">
            FOLLOW YOUR TASTE
            <ArrowDown size={13} />
          </span>
        </section>

        <section className="archive" ref={archiveRef} id="archive">
          <div className="archive-heading">
            <div>
              <span className="section-eyebrow">
                {savedOnly
                  ? "YOUR PERSONAL COLLECTION"
                  : isWhiskyMenu
                    ? "EXPLORE THE WORLD OF WHISKY"
                    : "MIX, SIP & DISCOVER"}
              </span>
              <h2>
                {savedOnly
                  ? "내 컬렉션"
                  : isWhiskyMenu
                    ? "위스키 아카이브"
                    : "칵테일 레시피"}
                <span>{savedOnly ? collectionCount : allListItems.length}</span>
              </h2>
              <p>
                {savedOnly
                  ? "마음에 담아둔 한 잔을 다시 만나보세요."
                  : isWhiskyMenu
                    ? "알수록 더 깊어지는 취향, 당신의 다음 위스키를 만나보세요."
                    : "재료부터 만드는 방법까지, 근사한 한 잔을 위한 모든 것."}
              </p>
            </div>
            <div className="search-field">
              <Search size={19} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  isWhiskyMenu
                    ? "위스키 이름, 증류소, CS, 태그 검색"
                    : "칵테일 이름, 재료, 태그 검색"
                }
                aria-label={isWhiskyMenu ? "위스키 검색" : "칵테일 검색"}
              />
              {query ? (
                <button
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  aria-label="검색어 지우기"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd>/</kbd>
              )}
            </div>
          </div>

          <div className="catalog-layout">
            <aside
              id="catalog-filters"
              className={`filters ${mobileFilters ? "mobile-open" : ""}`}
              aria-label="검색 필터"
            >
              <div className="filter-heading">
                <h3>
                  <SlidersHorizontal size={17} />
                  필터<span>{activeCount > 0 ? activeCount : ""}</span>
                </h3>
                <button onClick={resetFilters}>초기화</button>
              </div>
              <fieldset>
                <legend>
                  {isWhiskyMenu ? "위스키 종류" : "베이스 스피릿"}
                </legend>
                <div className="category-options">
                  <button
                    className={!category ? "selected" : ""}
                    aria-pressed={!category}
                    onClick={() => setCategory("")}
                  >
                    <span>전체 {isWhiskyMenu ? "위스키" : "칵테일"}</span>
                    <span>{allListItems.length}</span>
                  </button>
                  {categories.map((value) => (
                    <button
                      key={value}
                      className={category === value ? "selected" : ""}
                      aria-pressed={category === value}
                      onClick={() =>
                        setCategory(category === value ? "" : value)
                      }
                    >
                      <span>{value}</span>
                      <span>
                        {
                          allListItems.filter(
                            (item) =>
                              (isWhisky(item) ? item.category : item.base) ===
                              value,
                          ).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
              {isWhiskyMenu && (
                <fieldset>
                  <legend>
                    생산 국가·지역
                    <Globe2 size={14} />
                  </legend>
                  <div className="country-options">
                    {allCountries.map((country) => (
                      <label key={country}>
                        <input
                          type="checkbox"
                          checked={countries.includes(country)}
                          onChange={() =>
                            setCountries((current) =>
                              current.includes(country)
                                ? current.filter((value) => value !== country)
                                : [...current, country],
                            )
                          }
                        />
                        <span>{country}</span>
                        <span className="country-count">
                          {
                            allListItems.filter(
                              (item) =>
                                isWhisky(item) && item.country === country,
                            ).length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              <fieldset>
                <legend>
                  {isWhiskyMenu ? "특징 · 향과 맛" : "맛과 분위기"}
                  <Tag size={14} />
                </legend>
                <p className="filter-help">선택한 태그를 모두 포함해요</p>
                <div className="flavor-groups">
                  {flavorGroups.map((group) => (
                    <details key={group.id} className="flavor-group" open>
                      <summary>
                        {group.label}
                        <ChevronDown size={12} />
                      </summary>
                      <div className="flavor-options">
                        {group.tags.map((tag) => (
                          <button
                            key={tag}
                            className={tags.includes(tag) ? "selected" : ""}
                            aria-label={`#${tag}`}
                            aria-pressed={tags.includes(tag)}
                            disabled={
                              !flavorCounts.get(tag) && !tags.includes(tag)
                            }
                            onClick={() => toggleTag(tag)}
                          >
                            {tags.includes(tag) && <Check size={11} />}#{tag}
                            <span className="flavor-count">
                              {flavorCounts.get(tag) ?? 0}
                            </span>
                          </button>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </fieldset>
              <div className="sidebar-note">
                <span className="sidebar-note-icon">
                  <GlassWater size={23} strokeWidth={1.3} />
                </span>
                <span className="section-eyebrow">A NOTE FOR YOU</span>
                <p>
                  좋은 위스키의 기준은
                  <br />
                  <strong>당신의 취향입니다.</strong>
                </p>
                <span className="note-line" />
              </div>
              <button
                className="mobile-filter-done button"
                onClick={() => {
                  setMobileFilters(false);
                  mobileFilterButtonRef.current?.focus();
                }}
              >
                결과 {results.length}개 보기
                <Check size={16} />
              </button>
            </aside>

            <div
              className="catalog-main"
              ref={resultsRef}
              tabIndex={-1}
              aria-label="검색 결과 목록"
            >
              <div className="results-toolbar">
                <div className="results-count">
                  {query ? (
                    <>
                      <strong>‘{query}’</strong> 검색 결과{" "}
                    </>
                  ) : (
                    <>총 </>
                  )}
                  <strong>{results.length}</strong>개의{" "}
                  {isWhiskyMenu ? "위스키" : "레시피"}
                  {savedOnly && (
                    <button
                      className="back-all"
                      onClick={() => setSavedOnly(false)}
                    >
                      <ArrowLeft size={12} />
                      전체 보기
                    </button>
                  )}
                </div>
                <div className="toolbar-actions">
                  <button
                    ref={mobileFilterButtonRef}
                    className="mobile-filter-toggle"
                    aria-controls="catalog-filters"
                    onClick={() => setMobileFilters((value) => !value)}
                    aria-expanded={mobileFilters}
                  >
                    <SlidersHorizontal size={15} />
                    필터{activeCount > 0 ? ` ${activeCount}` : ""}
                  </button>
                  <label className="sort-select">
                    <span className="sr-only">정렬 방식</span>
                    <select
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value as SortOrder)
                      }
                    >
                      <option value="featured">에디터 추천순</option>
                      <option value="name">이름순</option>
                      {isWhiskyMenu ? (
                        <>
                          <option value="abv">도수 높은순</option>
                          <option value="price-asc">가격 낮은순</option>
                          <option value="price-desc">가격 높은순</option>
                        </>
                      ) : (
                        <option value="time">조리 시간순</option>
                      )}
                    </select>
                    <ChevronDown size={14} />
                  </label>
                </div>
              </div>
              <div className="display-controls">
                <div className="page-size-control">
                  <span>페이지당</span>
                  <div
                    className="page-size-buttons"
                    role="group"
                    aria-label="페이지당 표시 개수"
                  >
                    {PAGE_SIZES.map((size) => (
                      <button
                        key={size}
                        aria-pressed={pageSize === size}
                        onClick={() => setPageSize(size)}
                      >
                        {size}개
                      </button>
                    ))}
                  </div>
                </div>
                <span className="page-range">
                  {pagination.start}–{pagination.end} / {pagination.totalItems}
                  개
                </span>
              </div>
              {isWhiskyMenu &&
                (sort === "price-asc" || sort === "price-desc") && (
                  <p className="price-sort-note">
                    데일리샷 스토어 평균가 기준 · 가격 정보가 없는 제품은
                    마지막에 표시됩니다.
                  </p>
                )}
              {(activeCount > 0 || query) && (
                <div className="active-filters">
                  {query && (
                    <button onClick={() => setQuery("")}>
                      검색: {query}
                      <X size={12} />
                    </button>
                  )}
                  {category && (
                    <button onClick={() => setCategory("")}>
                      {category}
                      <X size={12} />
                    </button>
                  )}
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() =>
                        setCountries((current) =>
                          current.filter((value) => value !== country),
                        )
                      }
                    >
                      {country}
                      <X size={12} />
                    </button>
                  ))}
                  {tags.map((tag) => (
                    <button key={tag} onClick={() => toggleTag(tag)}>
                      #{tag}
                      <X size={12} />
                    </button>
                  ))}
                  <button className="clear-all" onClick={resetFilters}>
                    모두 지우기
                  </button>
                </div>
              )}
              <div className="sr-only" role="status" aria-live="polite">
                {results.length}개의 {isWhiskyMenu ? "위스키" : "칵테일"} 검색
                결과. {pagination.page} / {pagination.totalPages}페이지,{" "}
                {pagination.start}–{pagination.end}번째 항목 표시
              </div>
              {results.length > 0 ? (
                <>
                  <div className="product-grid">
                    {pagination.items.map((item) => (
                      <Card
                        key={item.id}
                        item={item}
                        saved={saved.includes(item.id)}
                        onSave={() => toggleSave(item)}
                        onOpen={() => setDetail(item)}
                        onTag={toggleTag}
                      />
                    ))}
                  </div>
                  <nav className="pagination" aria-label="목록 페이지">
                    <button
                      className="pagination-step"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      aria-label="이전 페이지"
                    >
                      <ChevronLeft size={16} />
                      <span>이전</span>
                    </button>
                    <div className="pagination-numbers">
                      {getPaginationPages(
                        pagination.page,
                        pagination.totalPages,
                      ).map((number, index) =>
                        number === "ellipsis" ? (
                          <span
                            className="pagination-gap"
                            key={`gap-${index}`}
                            aria-hidden="true"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={number}
                            onClick={() => goToPage(number)}
                            aria-label={`${number}페이지`}
                            aria-current={
                              pagination.page === number ? "page" : undefined
                            }
                          >
                            {number}
                          </button>
                        ),
                      )}
                    </div>
                    <button
                      className="pagination-step"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      aria-label="다음 페이지"
                    >
                      <span>다음</span>
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </>
              ) : (
                <div className="empty-state">
                  {savedOnly ? (
                    <Bookmark size={33} strokeWidth={1.3} />
                  ) : (
                    <Search size={33} strokeWidth={1.3} />
                  )}
                  <h3>
                    {savedOnly && !collectionCount
                      ? "나만의 컬렉션을 시작해 보세요"
                      : "아직 일치하는 한 잔이 없어요"}
                  </h3>
                  <p>
                    {savedOnly && !collectionCount
                      ? "마음에 드는 위스키와 칵테일의 북마크를 눌러 저장하세요."
                      : "검색어를 바꾸거나 선택한 필터를 조금 줄여보세요."}
                  </p>
                  <button
                    className="button"
                    onClick={() => {
                      resetFilters();
                      if (savedOnly) setSavedOnly(false);
                    }}
                  >
                    {savedOnly ? "전체 둘러보기" : "필터 초기화"}
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="bottom-banner">
          <span className="bottom-banner-icon">✳</span>
          <div>
            <span className="section-eyebrow">
              {isWhiskyMenu ? "BEYOND THE BOTTLE" : "BACK TO THE ORIGIN"}
            </span>
            <h2>
              {isWhiskyMenu
                ? "좋아하는 위스키, 칵테일로도 만나보세요."
                : "칵테일의 시작, 베이스 위스키를 알아보세요."}
            </h2>
            <p>
              {isWhiskyMenu
                ? "클래식부터 새로운 조합까지. 당신의 홈 바에 영감을 더해줄 레시피."
                : "한 병에 담긴 향과 맛을 알면 한 잔이 더욱 풍부해집니다."}
            </p>
          </div>
          <button
            onClick={() => {
              changeMenu(isWhiskyMenu ? "cocktail" : "whisky");
              setSavedOnly(false);
              browse();
            }}
          >
            {isWhiskyMenu ? "칵테일 레시피 탐색" : "위스키 아카이브 탐색"}
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <BrandMark small />
          <p>취향을 기록하고, 새로운 한 잔을 발견하는 곳.</p>
        </div>
        <div className="footer-right">
          <span>
            엄선한 {collapseScotchBatches(whiskies).length}종의 위스키 ·{" "}
            {cocktails.length}개의 칵테일 레시피
          </span>
          <p>© {new Date().getFullYear()} WHISKY NOTE. Made for the curious.</p>
        </div>
      </footer>
      {detail && (
        <DetailModal
          key={getScotchBatchGroup(detail)?.id ?? detail.id}
          item={detail}
          saved={saved.includes(detail.id)}
          onSave={() => toggleSave(detail)}
          onClose={closeDetail}
          onRelated={setDetail}
          onBatchChange={setDetail}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          {toast}
          <button aria-label="알림 닫기" onClick={() => setToast("")}>
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
}
