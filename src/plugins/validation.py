import os
import frontmatter
import sys
from pydantic import BaseModel, ValidationError, field_validator
from typing import List, Literal
from datetime import date

class Schema(BaseModel):
    title: str
    date: date
    type: Literal["lecture", "summary", "exam", "notes"]
    subject: str
    year: int
    term: int
    prof: str
    contributor: str
    tags: List[str]
    language: Literal["ar", "en"]

    @field_validator("year")
    def year_check(cls, v):
        if not (1 <= v <= 5):
            raise ValueError("year must be between 1 and 5")
        return v

    @field_validator("term")
    def term_check(cls, v):
        if v not in (1, 2):
            raise ValueError("term must be 1 or 2")
        return v

    @field_validator("tags")
    def tags_check(cls, v):
        if not isinstance(v, list) or len(v) == 0:
            raise ValueError("tags cannot be empty")
        return v

    @field_validator("language")
    def language_norm(cls, v):
        if v is None:
            raise ValueError("language is required")
        return v.lower()

def load_md(path):
    return frontmatter.load(path).metadata


def format_errors(err: ValidationError):
    return [
        f"{'.'.join(map(str, e['loc']))}: {e['msg']}"
        for e in err.errors()
    ]

def validate_file(path):
    meta = load_md(path)

    try:
        Schema(**meta)
        print(f"[OK] {path}")
        return True, None

    except ValidationError as e:
        errors = format_errors(e)

        print(f"[FAIL] {path}")
        for err in errors:
            print(" -", err)

        return False, errors


def validate_folder(folder):
    accepted = 0
    rejected = 0
    errors_log = []

    for root, _, files in os.walk(folder):
        for name in files:
            if not name.endswith(".md"):
                continue

            path = os.path.join(root, name)
            ok, errors = validate_file(path)

            if ok:
                accepted += 1
            else:
                rejected += 1
                errors_log.append((path, errors))

    print("\n===== SUMMARY =====")
    print(f"Accepted: {accepted}")
    print(f"Rejected: {rejected}")

    if rejected > 0:
        print("\nValidation failed. Blocking merge.")
        sys.exit(1)

    if errors_log:
        print("\n===== ERROR REPORT =====")
        for path, errs in errors_log:
            print(f"\n{path}")
            for e in errs:
                print(" -", e)

if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)
    content_dir = os.path.join(base_dir, "content")

    validate_folder(content_dir)