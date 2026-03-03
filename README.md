# spatial-mcp-shell
Next generation of spatial computing based on the MCP paradigm and the No-Forms capture system. [SPATIAL-OS] [ZENITH]

# 🛸 Spatial MCP Shell & No-Forms Submodule

This submodule is the interaction core of [Spatial OS](https://docs.google.com/document/d/13QOEDzZkQEEpBw9TeO_YS1UTiequy68g7dXTzPTVta4/edit?tab=t.0). It implements the User Interface (Shell) and the data capture system (No-Forms) under the **MCP (Multi-Context Perceptive) Spatial** paradigm.

## 🧠 The MCP Spatial Paradigm

Unlike traditional 2D interfaces, this system manages information based on the user's **depth perception and attentional context**:

* **Multi-Context:** The system segments cognitive load into Z-layers.
* **Perceptive:** Rendering fidelity (blur, saturation, refresh rate) varies based on the distance to the "Z-Camera."
* **Spatial:** Every interaction is a node with position, mass, and spring physics.

## 🚀 Key Features

### 1. No-Forms Capture (Z:0 Interface)

We have eliminated forms. Data capture is performed through natural language from the focus layer:

* **Quick Capture:** `Super + Space` opens a universal input.
* **AI Normalization:** Integration with [Ollama](https://ollama.ai) to structure text/voice into live JSON nodes.
* **Materialization:** Data "flies" from the input to its corresponding Z-layer based on its urgency.

### 2. Spatial Shell (The HUD)

Built on [AGS (Aylur's GTK Shell)](https://github.com/Aylur/ags), the Shell acts as the operating system's "dashboard":

* **Z-Indicator:** Real-time visualizer of current depth.
* **Parallax Layers:** Backgrounds and widgets that react to Z-camera movement.
* **Node Graph:** Visualization of relationship threads between windows and No-Forms entities.

### 3. Compositor Integration

This submodule communicates with the [spatial fork of Hyprland](https://github.com/williamag929/Hyprland) via a low-latency Unix socket (`spatial-shell-v1`).

## 🛠️ Installation and Setup

### Requirements

* [Hyprland (Spatial Fork)](https://github.com/williamag929/Hyprland) installed.
* `no-forms-daemon` (included in `/bin`).
* [SurrealDB](https://surrealdb.com/) for graph storage.
* [Ollama](https://ollama.ai) with the `llama3` or `mistral` model loaded.

### Installation

```bash
git submodule add https://github.com/williamag929/spatial-mcp-shell.git
cd spatial-mcp-shell
make setup

```

## 📂 Project Structure

```text
.
├── src/
│   ├── shell/          # AGS Widgets (Z-Indicator, HUD)
│   ├── no-forms/       # Capture client and AI integration
│   └── mcp/            # Context and layer management logic
├── shaders/            # Blur and depth effects for the Shell
├── docs/               # Technical specs (MCP_SPATIAL.md)
└── scripts/            # Dispatchers for hyprctl

```

## 📡 API Contracts (IPC)

The Shell listens for critical events to maintain visual synchrony:

* `spatial:layer`: Active layer change (0-3).
* `spatial:anim`: Exact Z-camera position during scrolling (used for parallax effects).
* `noforms:node`: Notification of a new normalized node ready to render.

## 📄 License

This project is distributed under the **[MIT License](https://opensource.org/licenses/MIT)**, encouraging the massive adoption of the spatial paradigm in the Linux ecosystem.

---

### Project References

* [Spatial Shell Architecture (P1)](https://docs.google.com/document/d/1OUgnOctAcoDuRMncLKdv09gW1PGehZy0muN46jT2d7U/edit?tab=t.0)
* [No-Forms Specification](https://docs.google.com/document/d/1FujDPgUfXNnNF36MkUwpUHWo-SwZ7s1-LFOYiUTR03M/edit?tab=t.0)
* [Project Status and Roadmap](https://docs.google.com/document/d/13QOEDzZkQEEpBw9TeO_YS1UTiequy68g7dXTzPTVta4/edit?tab=t.0)
