"""
Agrega una lección al array TOPICS y la guarda en lessons/.
Uso: python write_lesson.py <tema> <leccion> <titulo> <contenido>

Ejecutar una vez por lección para evitar el timeout de la API.
"""
import ast
import os
import sys


def load_topics():
    with open("topics.py") as f:
        src = f.read()
    tree = ast.parse(src)
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for t in node.targets:
                if isinstance(t, ast.Name) and t.id == "TOPICS":
                    return ast.literal_eval(node.value)
    return []


def save_topics(topics):
    with open("topics.py", "w") as f:
        f.write(f"TOPICS = {repr(topics)}\n")


def write_lesson(tema: int, leccion: int, titulo: str, contenido: str):
    os.makedirs("lessons", exist_ok=True)
    filename = f"lessons/tema_{tema}_leccion_{leccion}.md"
    with open(filename, "w") as f:
        f.write(f"# Tema {tema} — Lección {leccion}: {titulo}\n\n")
        f.write(contenido)
    print(f"Lección guardada: {filename}")

    topics = load_topics()
    entry = {"tema": tema, "leccion": leccion, "titulo": titulo, "archivo": filename}
    topics = [t for t in topics if not (t["tema"] == tema and t["leccion"] == leccion)]
    topics.append(entry)
    topics.sort(key=lambda t: (t["tema"], t["leccion"]))
    save_topics(topics)
    print(f"TOPICS actualizado ({len(topics)} entradas)")


if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Uso: python write_lesson.py <tema> <leccion> <titulo> <contenido>")
        sys.exit(1)
    write_lesson(int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4])
