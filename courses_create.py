from copy import deepcopy
import pandas as pd

"""
                <div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-4 text-center">
                                    <a href="https://www.cmpe.boun.edu.tr/tr/courses/cmpe532" class="big-title">CmpE
                                        532</a>
                                </div>
                                <div class="col-xs-8">
                                    <div class="small-title"><strong>Speech Processing</strong></div>
                                    <div>instructed by Fikret Gürgen</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

course_template = """
                <div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-4 text-center">
                                    <a href="course_page" class="big-title">course_code</a>
                                </div>
                                <div class="col-xs-8">
                                    <div class="small-title"><strong>course_name</strong></div>
                                    <div>instructed by instructor_name</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

def create_course(course):
    """
    Create a course's profile page
    :param course: dictionary
    :return: string
    """
    template = deepcopy(course_template)
    for key, value in course.items():
        template = template.replace(key, value)
    return template


# course = {
#     'course_code': 'CMPE 532',
#     'course_name': 'Speech Processing',
#     'instructor_name': 'Fikret Gürgen',
#     'course_page': 'https://www.cmpe.boun.edu.tr/tr/courses/cmpe532'
# }

# print(create_course(course))

courses = pd.read_excel('database.xlsx', sheet_name='courses').to_dict(orient='records')
related_courses = pd.read_excel('database.xlsx', sheet_name='related_courses').to_dict(orient='records')


courses_here = ''
related_courses_here = ''

for i, course in enumerate(courses):
    courses_here += create_course(course)
    if i % 2 == 1:
        courses_here += '<div class="clearfix"></div>'

for i, related_course in enumerate(related_courses):
    related_courses_here += create_course(related_course)
    if i % 2 == 1:
        related_courses_here += '<div class="clearfix"></div>'

# Read the html template
with open('courses_dummy.html', 'r') as file:
    template = file.read()

# Replace the placeholders with the actual content
template = template.replace('courses_here', courses_here)
template = template.replace('related_here', related_courses_here)

# Write the new content to a new file
with open('courses.html', 'w') as file:
    file.write(template)
