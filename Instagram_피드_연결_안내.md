# Instagram 피드 연결 안내

소장님,
홈페이지 News 페이지에 사무소 Instagram 피드를 자동으로 표시하기 위한 절차입니다.
약 **5분** 정도 소요됩니다.

---

## 무엇을 하는 건가요?

`@so.c_architects` Instagram 계정에 새 게시물을 올리시면,
홈페이지 News 페이지에도 자동으로 같은 사진들이 보이게 됩니다.

별도로 홈페이지에 게시물을 또 올릴 필요가 없고,
Instagram 한 곳에서만 관리하시면 됩니다.

---

## 절차 (5단계)

### 1. LightWidget 접속

브라우저에서 https://lightwidget.com 접속.

우측 상단 **Get started for free** 버튼 클릭.

### 2. Instagram 계정 연결

- "Connect with Instagram" 버튼 클릭
- 사무소 Instagram 계정(`@so.c_architects`)으로 로그인
- 권한 허용 (피드 사진 읽기 권한)

> ⚠️ 개인 Instagram이 아닌 **사무소 계정**으로 로그인하셔야 합니다.

### 3. 위젯 디자인 설정

기본값으로 두셔도 되고, 원하시면 아래 항목을 조정하실 수 있습니다:

| 항목 | 권장 설정 |
|------|----------|
| Layout | **Grid** (격자 형태, 가장 깔끔) |
| Number of photos | **12장** (무료 플랜 기본) |
| Spacing | **Small** (사이트 톤과 어울림) |
| Hover effect | **Fade** 또는 **None** |
| Background color | **White (#FFFFFF)** |

### 4. 위젯 ID 복사

설정을 마치고 **Save** 버튼을 누르면 화면에 코드가 나타납니다.

코드 안에 이런 부분이 있을 거예요:
```html
<iframe src="//lightwidget.com/widgets/abc123def456.html" ...>
```

여기서 **`abc123def456`** 부분이 **위젯 ID**입니다.
(실제 값은 영문+숫자 조합 12~16자리 정도)

이 ID를 복사해두시면 됩니다.

### 5. 위젯 ID 전달

복사한 위젯 ID를 카톡/메일로 홍준스튜디오에 보내주세요.

받으면 홈페이지 환경변수에 등록 → 다음 배포 시 News 페이지에 피드 자동 표시됩니다.

---

## 비용

- **Free 플랜**: 0원
- 게시물 12장까지 표시
- 12시간마다 자동 업데이트
- 좌하단에 작은 LightWidget 로고 워터마크 (눈에 거의 안 띔)

추후에 더 많은 게시물이나 워터마크 제거가 필요하시면 **Pro 플랜 (월 $7~)** 업그레이드 가능합니다. 처음엔 Free로 시작 추천드려요.

---

## 자주 묻는 질문

### Q. Instagram에서 게시물을 지우면 사이트에서도 사라지나요?
네, LightWidget은 Instagram 계정의 현재 게시물 목록을 그대로 표시합니다.
12시간 정도 후에 동기화되어 사라집니다.

### Q. 사이트에서만 따로 보이게 할 사진을 올릴 수 있나요?
LightWidget은 Instagram에 올라간 것만 표시합니다.
사이트 단독 컨텐츠가 필요하시면 News 페이지에 별도 글 형식으로 추가해드릴 수 있어요.

### Q. 새 게시물 올렸는데 사이트에 안 보여요
LightWidget의 동기화 주기(12시간)가 지나야 반영됩니다.
급하게 보이려면 Pro 플랜(1시간 동기화)으로 전환하시거나,
LightWidget 대시보드에서 수동 동기화 버튼을 누르시면 됩니다.

### Q. Instagram이 아닌 다른 SNS도 가능한가요?
LightWidget은 Instagram 전용입니다.
다른 SNS도 보여드리고 싶으시면 EmbedSocial, Curator.io 같은 대안 서비스가 있고,
필요하시면 따로 견적 드리겠습니다.

---

## 셋업이 어려우시면

캡처 화면을 보내드리며 함께 셋업해드릴 수 있습니다.
연락 주세요.

---

홍준스튜디오 · HONGJUN STUDIO
