import requests 
from lxml import html

def get_papers(HTML_LINK):
    HTML = requests.get(HTML_LINK)
    HTML = HTML.text
    tree = html.fromstring(HTML)
    entries = tree.xpath("//ul[@class='publ-list']/li")

    papers = []

    doi = lambda x: f"//li[@id='{x.get('id')}']/nav/ul/li[1]/div[1]/a"
    author_list = lambda x: f"//li[@id='{x.get('id')}']/cite/span[@itemprop='author']"
    title = lambda x: f"//li[@id='{x.get('id')}']/cite/span[@class='title']"
    conference = lambda x: f"//li[@id='{x.get('id')}']/cite"

    get_authors = lambda x: [ author.text_content()
                                for author in tree.xpath(
                                    author_list(x)
                                )
                            ]
    get_doi = lambda x: tree.xpath(
        doi(x)
    )[0].get("href")

    get_title = lambda x: tree.xpath(
        title(x)
    )[0].text_content()

    get_conference = lambda x: x.xpath(conference(x))[0].text_content()

    year = "2024"
    for idx, entry in enumerate(entries):

        tags = entry.values()[0].split(" ")
        if tags[0] == "year":
            year = entry.text_content()

        else:
            
            AUTHORS = get_authors(entry)

            try:
                DOI = get_doi(entry)
            except:
                DOI = ""

            TITLE = get_title(entry).strip('.')

            CONFERENCE = get_conference(entry)
            CONFERENCE = CONFERENCE[CONFERENCE.find(TITLE)+len(TITLE):].strip()

            papers.append({
                "title": TITLE,
                "authors": AUTHORS,
                "conference": CONFERENCE,
                "doi": DOI,
                "year": year,
                "type": tags[1],
            })

    return papers


papers = get_papers("https://dblp.org/pid/12/5784.html")
papers += get_papers("https://dblp.org/pid/46/4922.html")


def get_publication_html(publication): return f"""
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="panel panel-default lab-panel">
                                <div class="panel-body">
                                    <a href="{publication['doi']}">
                                        <div class="small-title">{publication['title']}</div>
                                    </a>
                                    <div>by {', '.join(publication['authors'])}</div>
                                    <div>in {publication['conference'].lstrip('. ')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
"""


def get_yearly_publications_html(year, publications):
    return f"""
            <div class="row-fluid">
                <h2 class="lab-subsection-title">{year}</h2>
            </div>

            <a class="anchor" id="{year}"></a>

            {publications}
    """


def generate_publications_html(publications):
    years = sorted(list(set([p['year'] for p in publications])),key=lambda x: int(x), reverse=True)

    # add yearly publications
    yearly_publications = {year: [] for year in years}
    for year in years:
        for p in publications:
            if p['year'] == year:
                print(p)
                yearly_publications[year].append(get_publication_html(p))

    all_publications = []
    for year in years:
        all_publications.append(get_yearly_publications_html(year, '\n'.join(yearly_publications[year])))

    # print('\n'.join(all_publications))
    # HTML = HTML.replace("{PUBLICATIONS}", '\n'.join(yearly_publications))

    return '\n'.join(all_publications)


HTML_0 = """
<!DOCTYPE html>
<html class="gr__tabilab_cmpe_boun_edu_tr" lang="en">
<head>
    <meta charset="utf-8">
    <title>Publications | Boğaziçi University Perceptual Intelligence Lab</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <link href="static/css/bootstrap.css" rel="stylesheet">
    <link href="static/css/flat-ui.css" rel="stylesheet">
    <link href="static/css/lab.css" rel="stylesheet">

    <link href="images/favicon.ico" rel="shortcut icon">
    <script async="" src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>
    <script src="https://rawgit.com/moment/moment/2.22.2/min/moment.min.js" type="text/javascript"></script>

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
    <script src="static/js/html5shiv.js"></script>
    <script src="static/js/respond.min.js"></script>
    <![endif]-->
</head>
<body data-gr-c-s-loaded="true" data-spy="scroll" data-target="#affix-nav" style="">
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">

    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" data-target="#navbar-collapse" data-toggle="collapse" type="button">
                <span class="sr-only">Toggle navigation</span>
            </button>
            <a class="navbar-brand" href="/" title="Perceptual Intelligence Lab">PILAB</a>
        </div>

        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav">
                <li>
                    <a href="/">Home</a>
                </li>


                <li>
                    <a href="people.html">People</a>
                </li>


                <li>
                    <a href="projects.html">Projects</a>
                </li>


                <li class="active">
                    <a href="publications.html">Publications</a>
                </li>


                <li>
                    <a href="theses.html">Theses</a>
                </li>


                <li>
                    <a href="courses.html">Courses</a>
                </li>


                <li>
                    <a href="resources.html">Resources</a>
                </li>

            </ul>
            <ul class="nav navbar-nav navbar-right visible-lg">
                <li><a href="http://www.boun.edu.tr/" title="Boğaziçi University">BU</a></li>
                <li>
                    <a href="http://www.cmpe.boun.edu.tr/" title="Boğaziçi University Computer Engineering Department">
                        CmpE
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="row">
                <div class="col-md-10">
                    <h1 class="lab-section-title">Publications</h1>

"""
PUBLICATIONS = generate_publications_html(papers)
HTML_1 = """
                

                </div>

                <div class="col-md-2">
                    <nav class="sidebar" id="affix-nav">
                        <ul class="nav sidenav affix" data-offset-top="0" data-spy="affix">
                            <li class="active"><a href="#2020">2020</a></li>
                            <li class=""><a href="#2019">2019</a></li>
                            <li class=""><a href="#2018">2018</a></li>
                            <li class=""><a href="#2017">2017</a></li>
                            <li class=""><a href="#2016">2016</a></li>
                            <li><a href="#2015">2015</a></li>
                            <li><a href="#2014">2014</a></li>
                            <li><a href="#2013">2013</a></li>
                            <li><a href="#2012">2012</a></li>
                            <li><a href="#2011">2011</a></li>
                            <li><a href="#2010">2010</a></li>
                            <li><a href="#2009">2009</a></li>
                            <li><a href="#2008">2008</a></li>
                            <li><a href="#2007">2007</a></li>
                            <li><a href="#2006">2006</a></li>
                            <li><a href="#2005">2005</a></li>
                            <li><a href="#2004">2004</a></li>
                            <li><a href="#2003">2003</a></li>
                        </ul>
                    </nav>
                </div>
            </div>


        </div>
    </div>

    <footer>
        <hr>
        <p class="text-center">
            ©
            <a href="http://www.boun.edu.tr/">Boğaziçi University</a>
            <a href="http://www.cmpe.boun.edu.tr/">Computer Engineering Department</a>
            2020
        </p>
    </footer>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script>
    window.jQuery || document.write('<script src="static/js/jquery-2.0.3.min.js"><\/script>')
</script>
<script src="static/js/bootstrap.min.js"></script>

<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-124225373-1']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
</script>


</body>
</html>
"""

# with open('p.html', 'w', encoding='utf-8') as f:
#     f.write(PUBLICATIONS )
with open('../publications.html', 'w', encoding='utf-8') as f:
    f.write(HTML_0 + PUBLICATIONS + HTML_1)