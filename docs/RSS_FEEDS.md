# RSS Feeds Documentation

Project Hikma now provides RSS feeds for content syndication, allowing users to subscribe to updates via their preferred RSS reader or news aggregator.

## Available Feeds

### Master Feed (All Content)
- **URL**: `https://ID-Brains.github.io/id-db/rss.xml`
- **Description**: Contains all content across all academic levels
- **Items**: 50 most recent
- **Update**: Automatically on every build

### Level-Specific Feeds

| Level | URL | Description |
|-------|-----|-------------|
| Level 1 | `https://ID-Brains.github.io/id-db/rss/level-1.xml` | First year content |
| Level 2 | `https://ID-Brains.github.io/id-db/rss/level-2.xml` | Second year content |
| Level 3 | `https://ID-Brains.github.io/id-db/rss/level-3.xml` | Third year content |
| Level 4 | `https://ID-Brains.github.io/id-db/rss/level-4.xml` | Fourth year content |

Each level feed contains up to 30 most recent items for that specific academic year.

## Feed Format

Our RSS feeds include:
- **Standard RSS 2.0** format
- **Dublin Core** extensions (`dc:creator`, `dc:language`, `dc:subject`)
- **Atom** self-reference link
- Rich categorization with tags, subjects, and level/term metadata

### Example Feed Item

```xml
<item>
  <title>The Definitive NLP Encyclopedia: From Linguistics to LLMs</title>
  <link>https://ID-Brains.github.io/id-db/docs/docs/level-2/term-2/nlp/summaries/nlp_guide/</link>
  <guid isPermaLink="true">https://ID-Brains.github.io/id-db/docs/docs/level-2/term-2/nlp/summaries/nlp_guide/</guid>
  <description>An exhaustive 800+ line technical guide...</description>
  <pubDate>Fri, 17 Apr 2026 00:00:00 GMT</pubDate>
  <dc:creator>Youssefelaskandrany</dc:creator>
  <dc:language>en</dc:language>
  <category>nlp</category>
  <category>Level 2</category>
  <category>Term 2</category>
  <category>NLP</category>
  <category>Deep-Learning</category>
  <!-- Additional tags... -->
</item>
```

## How to Subscribe

### RSS Readers

1. Copy the feed URL you want to subscribe to
2. Open your RSS reader (Feedly, Inoreader, NetNewsWire, etc.)
3. Add a new subscription and paste the URL

### Browser Extensions

Many browsers support RSS feed detection:
- **Firefox**: Use extensions like "Feedbro" or "Awesome RSS"
- **Chrome**: Use extensions like "RSS Feed Reader"

Our site includes auto-discovery tags, so compatible browsers will automatically detect available feeds.

## Content Included

Feeds include the following content types:
- `summary` - Lecture summaries
- `reference` - Reference materials
- `notes` - Study notes
- `quiz` - Practice questions

## Metadata Fields

Each feed item includes:

| Field | Description |
|-------|-------------|
| `title` | Document title |
| `description` | Brief description from frontmatter |
| `link` | Direct URL to the content |
| `pubDate` | Publication date (from frontmatter) |
| `dc:creator` | Contributor/GitHub username |
| `dc:language` | Content language (ar/en) |
| `category` | Subject, level, term, and tags |

## Technical Implementation

### Build Process

Feeds are generated at build time using `@astrojs/rss`:
1. Content is collected from the `docs` collection
2. Items are filtered to include only those with valid dates
3. Items are sorted by publication date (newest first)
4. RSS XML is generated with Dublin Core extensions

### Auto-Discovery

All pages include RSS auto-discovery links in the `<head>`:

```html
<link rel="alternate" type="application/rss+xml"
      title="Project Hikma - All Content"
      href="https://ID-Brains.github.io/id-db/rss.xml" />
```



### Phase 2
- Telegram Bot notifications for new content
- Discord Webhook integration
- Batch notifications at 5 PM Egypt time
- External RSS feed aggregation
- Subject-specific feeds
- Contributor-specific feeds
- Language-specific feeds (Arabic/English)

## Support

For issues or feature requests related to RSS feeds, please open an issue on our [GitHub repository](https://github.com/ID-Brains/id-db).
