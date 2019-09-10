from shapely.geometry import LineString
from shapely.geometry import Point
from shapely.geometry import MultiPoint
from shapely.geometry import MultiLineString
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import matplotlib.cm as cm

class CrossSectionHelper:
    def __init__(self,plot=False):
        self.plot = plot



    def plotPoint(self, p, c=None, color=None):
        if color is not None:
            plt.scatter(p.x, p.y, color=color, cmap='gray')
        else:
            plt.scatter(p.x, p.y, c=c, cmap='gray')

    def plotLineSegment(self, lineSegment, color='blue'):
        xs = np.array(lineSegment.coords).T[0]
        ys = np.array(lineSegment.coords).T[1]
        plt.plot(xs, ys, color=color)

    def plotLineString(self, lineString, color="blue", plotPoints=True):
        for point_idx in range(len(lineString.coords[:]) - 1):
            p1 = Point(lineString.coords[:][point_idx])
            p2 = Point(lineString.coords[:][point_idx + 1])
            self.plotLineSegment(LineString([p1, p2]))
            if plotPoints:
                self.plotPoint(p1)
                self.plotPoint(p2)

    def getExtendedSegment(self, lineSegment, bbox_segments):
        xs = np.array(lineSegment.coords).T[0]
        ys = np.array(lineSegment.coords).T[1]
        coefficients = np.polyfit(xs, ys, 1)
        polynomial = np.poly1d(coefficients)
        BL_bbox_point = bbox_segments[0].coords[:][0]
        TR_bbox_point = bbox_segments[2].coords[:][0]

        x_axis = np.linspace(BL_bbox_point[0], TR_bbox_point[0], 2)
        y_axis = polynomial(x_axis)
        p1 = Point(x_axis[0], y_axis[0])
        p2 = Point(x_axis[1], y_axis[1])
        extended_segment = LineString([p1, p2])
        points = []
        for segment in bbox_segments:
            point_intersect = segment.intersection(extended_segment)
            if isinstance(point_intersect, Point):
                points.append(point_intersect)
        extended_segment = LineString(points)
        return extended_segment

    def plotPolygon(self, points, color='blue'):
        for point_idx in range(len(points) - 1):
            lseg_1 = LineString([point_idx[point_idx], point_idx[point_idx + 1]])

    def get_cross_sections(self, collars, point_from_idx, point_to_idx, threshold):
        collars = np.array(collars).T
        collars_points = MultiPoint(collars)
        p1 = Point(collars.T[0][point_from_idx], collars.T[1][point_from_idx])
        p2 = Point(collars.T[0][point_to_idx], collars.T[1][point_to_idx])
        diff_x = abs(collars[point_to_idx][0] - collars[point_from_idx][0])
        diff_y = abs(collars[point_from_idx][1] - collars[point_to_idx][1])
        if diff_x > diff_y:
            order_by_column = 'x'
        else:
            order_by_column = 'y'

        bbox_p1 = Point([collars.T[0].min() - 10, collars.T[1].min() - 10])
        bbox_p2 = Point(collars.T[0].min() - 10, collars.T[1].max() + 10)
        bbox_p3 = Point(collars.T[0].max() + 10, collars.T[1].max() + 10)
        bbox_p4 = Point(collars.T[0].max() + 10, collars.T[1].min() - 10)
        bbox_points = [bbox_p1, bbox_p2, bbox_p3, bbox_p4]
        lseg_1 = LineString([bbox_p1, bbox_p2])
        lseg_2 = LineString([bbox_p2, bbox_p3])
        lseg_3 = LineString([bbox_p3, bbox_p4])
        lseg_4 = LineString([bbox_p4, bbox_p1])
        bbox_segments = [lseg_1, lseg_2, lseg_3, lseg_4]

        p1 = Point(collars[point_from_idx][0], collars[point_from_idx][1])
        p2 = Point(collars[point_to_idx][0], collars[point_to_idx][1])
        line = LineString([p1, p2])
        parallel_segments = self.getParallelSegments(threshold, line, bbox_segments)
        lines = MultiLineString(parallel_segments)
        polygon = lines.convex_hull

        if self.plot:
            self.plotLineSegment(parallel_segments[0])
            self.plotLineSegment(parallel_segments[1])
        for point in collars_points:
            if polygon.contains(point):
                self.plotPoint(point, color=cm.hsv(0))
        self.plotLineSegment(parallel_segments[0], color=cm.hsv(0))
        self.plotLineSegment(parallel_segments[1], color=cm.hsv(0))

        cross_sections = []
        counter = -1
        while True:
            next_line = line.parallel_offset(threshold * 2 * (counter + 1), 'left')
            parallel_segments, points, points_idx = self.get_cross_section(threshold, next_line, bbox_segments, collars_points)
            counter += 1
            #print(points)
            if parallel_segments[0].is_empty == False:
                if len(points):
                    points_order = self.get_best_line_from_multipoints(points, points_idx, order_by_column)
                    cross_sections.append(points_order['idx'].values.tolist())
                    if self.plot:
                        if len(points_order) > 1:
                            temp = LineString(points_order)
                            self.plotLineString(temp)
                            self.plotLineSegment(parallel_segments[0], color=cm.hsv(counter * 2))
                            self.plotLineSegment(parallel_segments[1], color=cm.hsv(counter * 2))
            else:
                break;
        counter = 0
        while True:
            next_line = line.parallel_offset(threshold * 2 * (counter + 1), 'right')
            parallel_segments, points, points_idx = self.get_cross_section(threshold, next_line, bbox_segments, collars_points)
            counter += 1
            #print (points)
            if parallel_segments[0].is_empty == False:
                if len(points):
                    points_order = self.get_best_line_from_multipoints(points, points_idx, order_by_column)
                    cross_sections.append(points_order['idx'].values.tolist())
                    if self.plot:
                        if len(points_order) > 1 :
                            temp = LineString(points_order)
                            self.plotLineString(temp)
                            self.plotLineSegment(parallel_segments[0], color=cm.hsv(counter * 2))
                            self.plotLineSegment(parallel_segments[1], color=cm.hsv(counter * 2))
            else:
                break;
        if self.plot:
            plt.show()
        return cross_sections

    def getParallelSegments(self, offset, line, bbox_segments):
        parallel = line.parallel_offset(offset, 'left')
        parallel2 = line.parallel_offset(offset, 'right')
        seg_1 = self.getExtendedSegment(parallel, bbox_segments)
        seg_2 = self.getExtendedSegment(parallel2, bbox_segments)
        return [seg_1, seg_2]

    def get_cross_section(self, offset, line, bbox_segments, collars_points):
        points_in_polygon = []
        points_idx = []
        parallel_segments = self.getParallelSegments(offset, line, bbox_segments)
        if parallel_segments[0].is_empty == False:
            lines = MultiLineString(parallel_segments)
            polygon = lines.convex_hull
            for point_idx,point in enumerate(collars_points):
                if polygon.contains(point):
                    points_in_polygon.append(point)
                    points_idx.append(point_idx)
        return parallel_segments, points_in_polygon, points_idx

    def get_best_line_from_multipoints(self, points, points_idx, orderby='x'):
        listarray = []
        for pp in points:
            listarray.append([pp.x, pp.y])

        points_array = np.array(listarray)
        temp_df = pd.DataFrame()
        temp_df['x'] = points_array.T[0]
        temp_df['y'] = points_array.T[1]
        temp_df['idx'] = points_idx
        temp_df = temp_df.sort_values([orderby], axis=0)
        return temp_df[['x', 'y','idx']]

if __name__ == '__main__':
    temp = CrossSectionHelper(False)
    collars = np.array([[1,2,3,4,5,6,7,8,9,10],[1,2,3,1,2,2,1,2,3,1]])
    cross_sections = temp.get_cross_sections(collars, 0, 2, 0.3)
    print (cross_sections)

