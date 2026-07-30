# 한국어판을 읽는 법

이 공개판은 [VILA-Lab의 Dive into Claude Code][upstream]를 한국어로 읽기 위한
동반판이다. 원본은 Claude Code의 기능을 나열하는 문서가 아니라, 대규모 실제
에이전트 제품을 분석해 **오늘과 다음 세대의 AI 에이전트를 어떻게 설계할지**
묻는 연구다.

원본이 제시하는 가장 중요한 전환은 다음과 같다.

> 에이전트의 차이는 모델이 얼마나 영리한지만으로 설명되지 않는다. 모델을 둘러싼
> 권한, 컨텍스트, 도구, 복구, 세션과 인간 제어의 하니스가 제품의 실질적인
> 능력을 결정한다.

이 관점은 Claude Agent SDK의 이벤트를 관찰하는 강좌와 다르다. SDK 강좌가
“실제로 무엇을 관찰할 수 있는가”를 묻는다면, 이 연구는 “관찰된 구조가 어떤
가치와 설계 선택을 드러내는가”를 묻는다.

![Claude Code의 상위 구조][main-structure]

## 원문과 함께 읽기

각 장의 `원문으로 돌아가기` 링크는 한국어판이 읽은 고정 commit
`ab04bc85e4920ceef2a8a47c069524d3bc9fec22`를 가리킨다. 최신 연구 내용은
[upstream main][upstream]에서 확인한다.

이 한국어판은 무료 참고 자료다. 원저자와 논문의 공로를 대체하지 않으며,
연구를 자신의 최초 주장처럼 제시하지 않는다.

[upstream]: https://github.com/VILA-Lab/Dive-into-Claude-Code
[main-structure]: https://raw.githubusercontent.com/VILA-Lab/Dive-into-Claude-Code/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/assets/main_structure.png
