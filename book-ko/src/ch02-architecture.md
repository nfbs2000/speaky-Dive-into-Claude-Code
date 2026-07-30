# 2장: 다섯 계층과 하나의 에이전트 루프

원 연구는 Claude Code를 7개 구성요소와 5개 계층으로 분해한다. 이 분해는 파일
디렉터리의 복사본이 아니다. 사용자 입력이 행동과 결과로 바뀌는 책임의 경계다.

## 일곱 구성요소

1. **사용자**: 목표를 말하고 권한을 승인하며 결과를 검토한다.
2. **인터페이스**: 대화형 CLI, headless CLI, SDK, IDE와 데스크톱이다.
3. **에이전트 루프**: 모델 호출, 도구 디스패치와 결과 수집을 반복한다.
4. **권한 시스템**: deny 우선 규칙, 모드, 분류기와 훅을 결합한다.
5. **도구**: 내장 도구와 MCP 도구를 하나의 실행 표면으로 제공한다.
6. **상태와 지속성**: JSONL 대화, 프롬프트 기록과 sidechain을 보존한다.
7. **실행 환경**: 셸, 파일시스템, 웹과 외부 MCP 연결이다.

중요한 주장은 인터페이스마다 엔진이 따로 있지 않다는 것이다. CLI, SDK와 IDE가
하나의 `queryLoop`로 수렴한다. `QueryEngine`은 대화를 감싸는 객체이지 별도의
실행 엔진이 아니다.

## 다섯 계층

| 계층 | 책임 |
| --- | --- |
| Surface | 입력, 출력과 제품별 인터페이스 |
| Core | 컨텍스트 조립, 모델 호출과 에이전트 루프 |
| Safety/Action | 권한, 도구, 훅과 샌드박스 |
| State | 런타임 상태, 대화와 메모리 지속성 |
| Backend | 셸, 네트워크와 MCP 실행 환경 |

이 계층을 읽을 때 “어떤 이벤트가 화면에 보이는가”와 “실제로 어떤 컴포넌트가
행동을 소유하는가”를 구분해야 한다. UI는 루프를 보여 주지만 루프의 진실을
소유하지 않는다. 권한 패널은 결정을 전달하지만 권한 규칙을 재구현하지 않는다.

## 한 턴의 아홉 단계

원 연구는 한 턴을 다음 순서로 정리한다.

설정 해석 → 상태 초기화 → 컨텍스트 조립 → pre-model 압축 →
모델 호출 → 도구 디스패치 → 권한 게이트 → 실행 → 종료 조건

여기서 스트림은 단일 응답 상자가 아니다. 모델 텍스트, 도구 호출, 권한 대기,
도구 결과와 다음 모델 호출이 하나의 시간축에서 이어진다.

![한 턴의 실행 흐름][iteration]

## 원문으로 돌아가기

- [Architecture Overview][architecture]
- [README: Architecture at a Glance][readme]

[architecture]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/docs/architecture.md
[readme]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/README.md
[iteration]: https://raw.githubusercontent.com/VILA-Lab/Dive-into-Claude-Code/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/assets/iteration.png
