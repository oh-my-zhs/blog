---
title: "우리가 Astro를 선택한 이유 — 에이전시 기술 스택 공개"
excerpt: "콘텐츠 중심 프로젝트에서 Next.js 대신 Astro를 선택한 이유와 Island Architecture의 실제 성능 차이를 공개합니다."
publishedAt: "2026-04-10"
updatedAt: "2026-04-10"
author: "CTO"
tags:
  - astro
  - next.js
  - performance
  - tech-stack
  - frontend
readingTime: "5 min read"
---

웹 에이전시를 운영하다 보면 클라이언트마다 요구사항이 다릅니다. 어떤 클라이언트는 빠른 랜딩 페이지가 필요하고, 어떤 클라이언트는 복잡한 인터랙티브 앱을 원합니다. 저희는 그 모든 경우에 맞는 기술 스택을 고민하다가, **콘텐츠 중심 프로젝트에서는 Astro가 압도적으로 뛰어나다**는 결론에 도달했습니다.

## Next.js를 쓰지 않은 이유

Next.js는 훌륭한 프레임워크입니다. 저희도 인터랙티브 웹앱에는 Next.js를 사용합니다. 하지만 블로그, 랜딩 페이지, 마케팅 사이트처럼 콘텐츠가 중심인 프로젝트에서는 Next.js가 지나치게 무겁습니다.

실제로 동일한 블로그를 Next.js App Router와 Astro로 각각 구현해서 Lighthouse를 돌려봤습니다:

| 지표 | Next.js (App Router) | Astro |
|------|----------------------|-------|
| Performance | 78 | 99 |
| LCP | 2.4s | 0.8s |
| TBT | 320ms | 0ms |
| JS Bundle | 148KB | 0KB |

**Astro는 기본적으로 JavaScript를 전송하지 않습니다.** 클라이언트 인터랙션이 필요한 컴포넌트만 `client:load` 지시어로 선택적으로 hydrate 합니다. 이것이 바로 "Island Architecture"입니다.

## Astro의 Island Architecture

```astro
---
import InteractiveCounter from "../components/Counter.tsx";
import StaticHero from "../components/Hero.astro";
---

<!-- 정적 컴포넌트: JS 없음 -->
<StaticHero />

<!-- 인터랙티브 컴포넌트: 필요할 때만 hydrate -->
<InteractiveCounter client:visible />
```

`client:visible`은 해당 요소가 뷰포트에 들어올 때만 JavaScript를 로드합니다. 사용자가 스크롤하지 않으면 불필요한 JS는 절대 다운로드되지 않습니다.

## MDX로 풍부한 블로그 작성

Markdown만으로는 부족할 때가 있습니다. MDX를 사용하면 블로그 포스트 안에 React/Astro 컴포넌트를 직접 삽입할 수 있습니다:

```mdx
import CodePlayground from "../../components/CodePlayground.astro";

# API 설계 패턴

아래 코드를 직접 수정해보세요:

<CodePlayground
  code={`fetch('/api/users').then(r => r.json()).then(console.log)`}
  language="javascript"
/>
```

기술 블로그에서 독자가 코드를 직접 실행해볼 수 있다면? 학습 효과가 완전히 달라집니다.

## Vercel 배포: 설정 없이 바로

```bash
npm create astro@latest my-blog
cd my-blog
npx astro add vercel
git push origin main
# → 자동으로 https://my-blog.vercel.app 배포 완료
```

PR을 올리면 Preview URL이 자동 생성되고, main 브랜치에 merge 하면 프로덕션에 즉시 반영됩니다. 추가 CI/CD 설정이 전혀 필요 없습니다.

## 저희 블로그 오픈소스로 공개합니다

이 블로그 자체가 저희 기술 스택의 데모입니다. 소스 코드를 GitHub에 공개할 예정이니, 직접 fork해서 사용하셔도 됩니다.

다음 포스트에서는 저희가 클라이언트 프로젝트를 어떻게 빠르게 개발하고 배포하는지 철학과 워크플로를 공개합니다.

---

*AIT(AI Tech)는 AI 네이티브 IT 에이전시입니다. 웹, 앱, AI 솔루션을 빠르게 개발해 드립니다.*
